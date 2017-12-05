#find_library(MGL mgl PATHS /usr/local/lib)


#SET(GCC_COVERAGE_COMPILE_FLAGS "-lpqxx -lpq")

#SET(CMAKE_CXX_FLAGS "-lpqxx -lpq")


#ADD_EXECUTABLE( eyeLike test.cpp)

ADD_EXECUTABLE( eyeLike main.cpp findEyeCenter.cpp findEyeCenter.h findEyeCorner.cpp findEyeCorner.h constants.h helpers.cpp helpers.h)
TARGET_LINK_LIBRARIES( eyeLike ${OpenCV_LIBS} )
target_link_libraries( eyeLike ${MGL})
