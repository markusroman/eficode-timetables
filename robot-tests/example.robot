*** Settings ***
 
Library  SeleniumLibrary
Suite Teardown  Close All Browsers
 
*** Keywords ***
 
 
 
 
 
*** Test Cases ***
 
Example Test
    Open Browser    https://timetables-markus.netlify.com  firefox
    Sleep   6
