'use client'

// app/note/Page.tsx
import { SetStateAction, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function NotePage() {
  const [notes, setNotes] = useState<string[]>([]);
  const [editNoteIndex, setEditNoteIndex] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState('');

  const validationSchema = Yup.object().shape({
    newNote: Yup.string().required('The field is required'),
  });

  const addNote = (values: { newNote: string; }, actions: { resetForm: () => void; }) => {
    setNotes([...notes, values.newNote]);
    actions.resetForm();
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const editNote = (index: number) => {
    setEditNoteIndex(index);
    setEditedNote(notes[index]);
  };

  const saveEditedNote = () => {
    if (editedNote.trim() !== '') {
      if (editNoteIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editNoteIndex] = editedNote;
        setNotes(updatedNotes);
        setEditNoteIndex(null);
        setEditedNote('');
      }
    }
  };

  return (
    <div>
      <h1>Lista de Notas</h1>

      <Formik
        initialValues={{ newNote: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          if (values.newNote.trim() !== '') {
            addNote(values, actions);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              type="text"
              name="newNote"
              placeholder="New Nota"
            />
            <ErrorMessage name="newNote" component="div" />

            <button type="submit" disabled={isSubmitting}>Agregar</button>
          </Form>
        )}
      </Formik>

      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            {index === editNoteIndex ? (
              <>
                <Field
                  type="text"
                  name="editedNote"
                  value={editedNote}
                  onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEditedNote(e.target.value)}
                />
                <button onClick={saveEditedNote}>Save</button>
              </>
            ) : (
              <>
                {note}
                <button onClick={() => editNote(index)}>Edit</button>
                <button onClick={() => {
                  if (window.confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
                    deleteNote(index);
                  }
                }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotePage;
