#include <opencv2/objdetect/objdetect.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>

#include <iostream>
#include <queue>
#include <stdio.h>
#include <math.h>
#include <sstream>
//#include <pqxx/pqxx> 

//using namespace std;
//using namespace pqxx;

#include "constants.h"
#include "findEyeCenter.h"
#include "findEyeCorner.h"

//using namespace cv;

/** Constants **/


/** Function Headers */
void detectAndDisplay( cv::Mat frame ,cv::Mat frame_copy,cv::String frame_name);

/** Global variables x*/
//-- Note, either copy these two files from opencv/data/haarscascades to your current folder, or change these locations
cv::String face_cascade_name = "/home/yizhou/CS160/modified_eyeLike/res/haarcascade_frontalface_alt.xml";
cv::CascadeClassifier face_cascade;

cv::RNG rng(12345);
cv::Mat debugImage;
cv::Mat skinCrCbHist = cv::Mat::zeros(cv::Size(256, 256), CV_8UC1);

/**
 * @function main
 */
int main( int argc, char* argv[] ) { //const char** argv
  cv::Mat frame;
  cv::Mat oriFrame;
  cv::String path("/home/yizhou/CS160/dlib-19.1/python_examples/frame/*.jpg"); //select only jpg
  std::vector<cv::String> fn;
  cv::glob(path,fn,true); // recurse

// try {
//      connection C("dbname = testdb user = postgres password = cohondob \
//      hostaddr = 127.0.0.1 port = 5432");
//      if (C.is_open()) {
//         cout << "Opened database successfully: " << C.dbname() << endl;
//      } else {
//        cout << "Can't open database" << endl;
//         return 1;
//      }
//      C.disconnect ();
//  } catch (const std::exception &e) {
//      cerr << e.what() << std::endl;
//      return 1;
//   }





  // Load the cascades
  if( !face_cascade.load( face_cascade_name ) ){ printf("--(!)Error loading face cascade, please change face_cascade_name in source code.\n"); return -1; };


  createCornerKernels();
  ellipse(skinCrCbHist, cv::Point(113, 155.6), cv::Size(23.4, 15.2),
          43.0, 0.0, 360.0, cv::Scalar(255, 255, 255), -1);
  
  // edit begins --->> 
  // loads a still image from argument --->> 

for (size_t k=0; k<fn.size(); ++k)
{
  

     std::cout << fn[k]<< std::endl;

	frame = cv::imread(fn[k]);
  
  // a copy
  	oriFrame = frame;


  // flip it --->> 
  //	cv::flip(frame, frame, 1);
 
  // copy to debugImage --->> 
  // dont know yet what this is for --->> 
  	frame.copyTo(debugImage);

  // apply the classifier --->> 
  if( !frame.empty() ) {




        cv::String outputName = fn[k].substr(fn[k].find_last_of("/") + 1);

	outputName = outputName.substr(0, outputName.find_last_of("."));



	//cv::String outputName = fn[k].substr(0, fn[k].find_last_of("."));









        detectAndDisplay( frame,oriFrame,outputName);













      }
  else {
        printf("-- No image -- Program exits!\n");
        exit(-1);
  }

  
 // releaseCornerKernels();


}
 
releaseCornerKernels();
 
  return 0;
}

void findEyes(cv::Mat frame_gray, cv::Rect face,cv::Mat frame_copy,cv::String frame_name) {
  cv::Mat faceROI = frame_gray(face);
  cv::Mat debugFace = faceROI;

  if (kSmoothFaceImage) {
    double sigma = kSmoothFaceFactor * face.width;
    GaussianBlur( faceROI, faceROI, cv::Size( 0, 0 ), sigma);
  }
  //-- Find eye regions and draw them
  int eye_region_width = face.width * (kEyePercentWidth/100.0);
  int eye_region_height = face.width * (kEyePercentHeight/100.0);
  int eye_region_top = face.height * (kEyePercentTop/100.0);

  cv::Rect leftEyeRegion(face.width*(kEyePercentSide/100.0),
                         eye_region_top,eye_region_width,eye_region_height);

  cv::Rect rightEyeRegion(face.width - eye_region_width - face.width*(kEyePercentSide/100.0),
                          eye_region_top,eye_region_width,eye_region_height);

  //-- Find Eye Centers
  cv::Point leftPupil = findEyeCenter(faceROI,leftEyeRegion,"Left Eye");
  cv::Point rightPupil = findEyeCenter(faceROI,rightEyeRegion,"Right Eye");
 
 // get corner regions
  cv::Rect leftRightCornerRegion(leftEyeRegion);
  leftRightCornerRegion.width -= leftPupil.x;
  leftRightCornerRegion.x += leftPupil.x;
  leftRightCornerRegion.height /= 2;
  leftRightCornerRegion.y += leftRightCornerRegion.height / 2;
  cv::Rect leftLeftCornerRegion(leftEyeRegion);
  leftLeftCornerRegion.width = leftPupil.x;
  leftLeftCornerRegion.height /= 2;
  leftLeftCornerRegion.y += leftLeftCornerRegion.height / 2;
  cv::Rect rightLeftCornerRegion(rightEyeRegion);
  rightLeftCornerRegion.width = rightPupil.x;
  rightLeftCornerRegion.height /= 2;
  rightLeftCornerRegion.y += rightLeftCornerRegion.height / 2;
  cv::Rect rightRightCornerRegion(rightEyeRegion);
  rightRightCornerRegion.width -= rightPupil.x;
  rightRightCornerRegion.x += rightPupil.x;
  rightRightCornerRegion.height /= 2;
  rightRightCornerRegion.y += rightRightCornerRegion.height / 2;
  rectangle(debugFace,leftRightCornerRegion,200);
  rectangle(debugFace,leftLeftCornerRegion,200);
  rectangle(debugFace,rightLeftCornerRegion,200);
  rectangle(debugFace,rightRightCornerRegion,200);
  // change eye centers to face coordinates
  rightPupil.x += rightEyeRegion.x;
  rightPupil.y += rightEyeRegion.y;
  leftPupil.x += leftEyeRegion.x;
  leftPupil.y += leftEyeRegion.y;

  
 
  // BEGIN to get the coordinates of the pupils 
  rightPupil.x += face.x;
  rightPupil.y += face.y;
  leftPupil.x += face.x;
  leftPupil.y += face.y;


  
  cv::circle(frame_copy,cv::Point(rightPupil.x,rightPupil.y),5,cv::Scalar(0,0,255),2,8);
  cv::circle(frame_copy,cv::Point(leftPupil.x,leftPupil.y),5,cv::Scalar(0,0,255),2,8);
  
  cv::String ff="/home/yizhou/CS160/dlib-19.1/python_examples/frame_eye/" + frame_name+"_processed.jpg";

  cv::imwrite (ff, frame_copy);
  
//  std::cout << ff << std::endl;
//  std::cout << rightPupil.y << std::endl;
//  std::cout << leftPupil.x << std::endl;
//  std::cout << leftPupil.y << std::endl;




}
/**
 * @function detectAndDisplay
 */
void detectAndDisplay( cv::Mat frame,cv::Mat frame_copy,cv::String frame_name) {
  std::vector<cv::Rect> faces;
  std::vector<cv::Mat> rgbChannels(3);
  cv::split(frame, rgbChannels);
  cv::Mat frame_gray = rgbChannels[2];

  //-- Detect faces
  face_cascade.detectMultiScale( frame_gray, faces, 1.1, 2, 0|CV_HAAR_SCALE_IMAGE|CV_HAAR_FIND_BIGGEST_OBJECT, cv::Size(150, 150) );

  for( int i = 0; i < faces.size(); i++ )
  {
    // to know how many faces detected 
 //   printf("Faces detected: %lu\n", faces.size());
    // end --->> 
    rectangle(debugImage, faces[i], 1234);
  }
  //-- Show what you got
  if (faces.size() > 0) {
    // for debug ---
  //  printf("x of rectangle: %d \n", faces[0].x);
  //  printf("y of rectangle: %d\n", faces[0].y);
    // end --->> saira
    findEyes(frame_gray, faces[0],frame_copy,frame_name);
  } else {
    // if no eyes detected --
  //   printf("No eyes detected\n");
    // needs these output if no eyes detected, preferred output than error display --->> saira
 //   std::cout << -1 << std::endl;
  //  std::cout << -1 << std::endl;
  //  std::cout << -1 << std::endl;
  //  std::cout << -1 << std::endl;
    exit(-1);
  }
}
