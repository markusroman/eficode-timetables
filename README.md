This application was created for a job application for a summer job at Eficode.

Application shows the next itineraries between Eficode HQ, Helsinki and TUNI (formerly known as TUT), Tampere.
Radio buttons at the top provide a way to change the destination between a few possibilities.
You can refresh the page or switch direction with the two buttons provided at the bottom of the page.

Darktheme can be applied by changing the given theme for ThemeProvider in App.jsx

Instructions for running the application with docker:

git clone https://github.com/markusroman/eficode-timetables.git

docker build -t timetables .
docker run -p 3000:80 timetables

Go to localhost:3000 with a browser
