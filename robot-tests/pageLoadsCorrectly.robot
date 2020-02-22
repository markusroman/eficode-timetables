*** Settings ***
Documentation                                       Tests for assuring the correct application functionality
Library                                             SeleniumLibrary
Suite Teardown Close All Browsers

*** Variables ***
${LOGIN URL}                                        https://timetables-markus.netlify.com
${BROWSER}                                          Chrome
${DEFAULT HEADER}                                   From Eficode HQ to TTY
${SWAPPED HEADER}                                   From TTY to Eficode HQ
${CHANGED HEADER}                                   From Eficode HQ to Kamppi
${TITLE}                                            Timetables Application

*** Keywords ***
Open Browser To Default Page
    Open Browser                                    ${LOGIN URL}    ${BROWSER}
    Title Should Be                                 ${TITLE}

Init Tests
    Open Browser To Default Page
    Sleep                                           8
    Wait Until Page Contains                        ${DEFAULT HEADER}
 
*** Test Cases ***
Website opens and loads correctly
    Init Tests
    [Teardown] Close Browser

Destination can be changed
    Init Tests
    Click Element                                   css:radio#radio-Kamppi
    Sleep                                           8
    Wait Until Page Contains                        ${CHANGED HEADER}
    [Teardown] Close Browser

Route direction can be switched
    Init Tests
    Click Element                                   css:button#swap
    Sleep                                           8
    Wait Until Page Contains                        ${SWAPPED HEADER}
    [Teardown] Close Browser
