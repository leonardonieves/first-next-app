'use client';

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';

function NotePage() {
  const [notes, setNotes] = useState<string[]>([]);
  const [editNoteIndex, setEditNoteIndex] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteNoteIndex, setDeleteNoteIndex] = useState<number | null>(null);

  const validationSchema = Yup.object().shape({
    newNote: Yup.string().required('The field is required'),
  });

  const addNote = (values: { newNote: string; }) => {
    setNotes([...notes, values.newNote]);
    setEditedNote(''); // Clear the edited note after adding
  };

  const deleteNote = (index: number | null) => {
    console.log('aqui');
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setEditNoteIndex(null);
    setDeleteNoteIndex(null);
    closeDeleteConfirmation();
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

  const openDeleteConfirmation = (index: number) => {
    setOpenDialog(true);
    setDeleteNoteIndex(index);
  };

  const closeDeleteConfirmation = () => {
    setOpenDialog(false);
    setDeleteNoteIndex(null);
  };

  return (
    <div>
      <Typography variant="h4">Lista de Notas</Typography>

      <Formik
        initialValues={{ newNote: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          if (values.newNote.trim() !== '') {
            addNote(values);
            actions.resetForm();
          }
        }}
      >
        {({ isSubmitting, values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
          <form
            className='w-full'
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              type="text"
              name="newNote"
              label="Nueva Nota"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.newNote}
              error={touched.newNote && Boolean(errors.newNote)}
              helperText={touched.newNote && errors.newNote}
            />


            <Button type="submit" variant="contained" color="primary">
              Add Note
            </Button>
          </form>
        )}
      </Formik>

      <List>
        {notes.map((note, index) => (
          <ListItem key={index}>
            {index === editNoteIndex ? (
              <>
                <Formik
                  initialValues={{ editedNote }}
                  onSubmit={saveEditedNote}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <TextField
                        type="text"
                        name="editedNote"
                        label="Editar Nota"
                        variant="outlined"
                        value={editedNote}
                        onChange={(e) => setEditedNote(e.target.value)}
                        fullWidth
                      />
                      <ErrorMessage name="editedNote" component="div" className="error-message" />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        startIcon={<Check />}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setEditNoteIndex(null)}
                        startIcon={<Close />}
                      >
                        Cancelar
                      </Button>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <ListItemText primary={note} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => editNote(index)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => openDeleteConfirmation(index)} color="secondary">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar esta nota?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              deleteNote(deleteNoteIndex);
            }}
            color="secondary"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotePage;
