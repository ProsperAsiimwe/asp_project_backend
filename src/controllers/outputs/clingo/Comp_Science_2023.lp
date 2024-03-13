% Define courses
course(CS005).
course(CS0583).
course(CS456782).

% Define rooms
room(RM001).
room(RM002).
room(RM003).
room(RM004).

% Define time slots
time_slot(9:00 AM).
time_slot(10:00 AM).
time_slot(2:00 PM).

% Define teachers
teacher(Jesse).
teacher(Jane).
teacher(John).
teacher(Mike).

% Define predicates
% class(Course, Room, TimeSlot, Teacher)
% Represents a scheduled class for a course in a room at a specific time slot taught by a teacher
1 { class(Course, Room, TimeSlot, Teacher) : course(Course), room(Room), time_slot(TimeSlot), teacher(Teacher) } 1 :- course(Course).

% Constraints
% Ensure that each course is scheduled exactly once in each time slot
:- course(Course), time_slot(TimeSlot), not 1 { class(Course, _, TimeSlot, _) : room(_) } 1.
% Ensure that each teacher teaches at most one class in each time slot
:- teacher(Teacher), time_slot(TimeSlot), not 1 { class(_, _, TimeSlot, Teacher) : room(_) } 1.
% Ensure that rooms are not double-booked in each time slot
:- room(Room), time_slot(TimeSlot), not 1 { class(_, Room, TimeSlot, _) : course(_) } 1.

% Query
% The query will generate a solution (timetable) that satisfies all constraints
#show class/4.
