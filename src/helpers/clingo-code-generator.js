const generateClingoTimetableProgram = (data) => {
  let program = "";

  // Define courses
  program += `% Define courses\n`;
  data.courses.forEach((course) => {
    program += `course(${course}).\n`;
  });

  // Define rooms
  program += `\n% Define rooms\n`;
  data.rooms.forEach((room) => {
    program += `room(${room}).\n`;
  });

  // Define time slots
  program += `\n% Define time slots\n`;
  data.timeSlots.forEach((timeSlot) => {
    program += `time_slot(${timeSlot}).\n`;
  });

  // Define teachers
  program += `\n% Define teachers\n`;
  data.teachers.forEach((teacher) => {
    program += `teacher(${teacher}).\n`;
  });

  // Define predicates
  program += `\n% Define predicates\n`;
  program += `% class(Course, Room, TimeSlot, Teacher)\n`;
  program += `% Represents a scheduled class for a course in a room at a specific time slot taught by a teacher\n`;
  program += `1 { class(Course, Room, TimeSlot, Teacher) : course(Course), room(Room), time_slot(TimeSlot), teacher(Teacher) } 1 :- course(Course).\n`;

  // Constraints
  program += `\n% Constraints\n`;
  program += `% Ensure that each course is scheduled exactly once in each time slot\n`;
  program += `:- course(Course), time_slot(TimeSlot), not 1 { class(Course, _, TimeSlot, _) : room(_) } 1.\n`;
  program += `% Ensure that each teacher teaches at most one class in each time slot\n`;
  program += `:- teacher(Teacher), time_slot(TimeSlot), not 1 { class(_, _, TimeSlot, Teacher) : room(_) } 1.\n`;
  program += `% Ensure that rooms are not double-booked in each time slot\n`;
  program += `:- room(Room), time_slot(TimeSlot), not 1 { class(_, Room, TimeSlot, _) : course(_) } 1.\n`;

  // Query
  program += `\n% Query\n`;
  program += `% The query will generate a solution (timetable) that satisfies all constraints\n`;
  program += `#show class/4.\n`;

  return program;
};

module.exports = { generateClingoTimetableProgram };
