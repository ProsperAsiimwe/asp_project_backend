function generateClingoCode(payload) {
  let code = "";

  // Define courses with their maximum number of students and associated teachers
  payload.courses.forEach((course) => {
    code += `course(${course.name}, ${course.maxStudents}). % Define course ${course.name}\n`;
    course.teachers.forEach((teacher) => {
      code += `teacher_course(${teacher}, ${course.name}). % ${teacher} teaches ${course.name}\n`;
    });
  });

  // Define rooms with their capacity
  payload.rooms.forEach((room) => {
    code += `room(${room.name}, ${room.capacity}). % Define room ${room.name}\n`;
  });

  // Define days of the week
  code +=
    "day(monday; tuesday; wednesday; thursday; friday). % Define the days of the week\n";

  // Define time slots
  code += "time(8; 9; 10; 11; 12; 1; 2; 3; 4; 5). % Define the time slots\n";

  // Define teacher availability
  payload.teachers.forEach((teacher) => {
    if (teacher.availability && teacher.availability.length > 0) {
      code += `available(${teacher.name}, ${teacher.availability.join(
        "; "
      )}). % Define ${teacher.name}'s availability\n`;
    }
  });

  // Define lunch break time slot
  code += "lunch_break(12). % Define the lunch break time slot\n";

  // Define the schedule
  code += `1 { schedule(Day, Time, Course, Room, Teacher) : day(Day), time(Time), course(Course, _) , room(Room, _) , teacher_course(Teacher, Course) } 1 :- course(Course, _), teacher_course(Teacher, Course). % Define the schedule\n`;

  // Define constraints
  code += `
  % Constraints
  :- schedule(Day, Time, Course, Room, Teacher), schedule(Day, Time, OtherCourse, Room, OtherTeacher), Course != OtherCourse, Teacher = OtherTeacher.
  :- schedule(Day, Time, Course, Room, Teacher), schedule(Day, OtherTime, Course, Room, OtherTeacher), Time != OtherTime, Teacher = OtherTeacher.
  :- schedule(Day, Time, Course, Room, Teacher), schedule(OtherDay, Time, Course, Room, OtherTeacher), Day != OtherDay, Teacher = OtherTeacher.
  :- schedule(Day, Time, Course, Room, Teacher), schedule(Day, Time, OtherCourse, _, Teacher), Course != OtherCourse.
  :- schedule(Day, Time, Course, Room, Teacher), schedule(Day, Time, OtherCourse, _, Teacher), Course != OtherCourse.
  :- schedule(Day, Time, Course, _, Teacher), schedule(Day, OtherTime, Course, _, Teacher), Time != OtherTime.
  :- schedule(Day, Time, Course, Room, _), course(Course, Students), room(Room, Capacity), Students > Capacity.
  :- schedule(Day, Time, _, _, Teacher), not available(Teacher, Day).
  :- schedule(Day, Time, _, _, _), lunch_break(Time).
  :- schedule(Day, Time1, Course, _, Teacher), schedule(Day, Time2, Course, _, Teacher), Time1 != Time2, abs(Time1 - Time2) != 1.
  `;

  // Spread courses across available days for teachers teaching multiple courses
  payload.teachers.forEach((teacher) => {
    if (teacher.availability && teacher.availability.length > 1) {
      const days = teacher.availability
        .map((day) => `schedule(${day}, _, _, _, ${teacher.name})`)
        .join(", ");
      code += `:- ${days}. % Spread courses across available days for ${teacher.name}\n`;
    }
  });

  // Show schedule
  code += "\n#show schedule/5. % Show schedule\n";

  return code;
}

module.exports = { generateClingoCode };
