# F4 lesson consolidation

The learner-facing F4 list is now:

1. F4.1 3D VIEWS — former Understanding 3D Views and Standard 3D Views, with the original tutorial.
2. F4.2 USER VIEWS — former Understanding User Views and Managing User Views, with the original instructions and tutorial.
3. F4.3 SHADING — shading content from Basic Display Controls; Show and Hide is no longer included.

The course now contains 65 lessons. English and Japanese titles use the same display numbering.

Storage IDs remain F4.1, F4.6 and F4.12. The optional displayId controls the latter two labels in both frontend and backend lesson trees. This prevents historical F4.2 (Standard 3D Views) or F4.3 (Top View) records from being incorrectly credited to User Views or Shading. Legacy bookmarks retain their original topic mapping, and records are not rewritten. Removed lesson IDs are route aliases, not newly granted completion credit.

Validation: 89 targeted frontend tests and TypeScript passed. The backend pytest suite could not run in the bundled Python environment because pytest is not installed.
