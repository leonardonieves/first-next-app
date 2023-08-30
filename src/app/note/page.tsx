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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';

interface INote {
  value: string;
  date: string;
}

function NotePage() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [editNoteIndex, setEditNoteIndex] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState<INote | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteNoteIndex, setDeleteNoteIndex] = useState<number | null>(null);

  const validationSchema = Yup.object().shape({
    newNote: Yup.string().required('The field is required'),
  });

  const addNote = (newNote: string) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    var note: INote = { value: newNote, date: formattedDate }
    setNotes([...notes, note]);
    setEditedNote(null);
  };

  const deleteNote = (index: number | null) => {
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
    if (editedNote?.value.trim() !== '') {
      if (editNoteIndex !== null && editedNote !== null) {
        const updatedNotes = [...notes];
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        updatedNotes[editNoteIndex] = editedNote;
        setNotes(updatedNotes);
        setEditNoteIndex(null);
        setEditedNote(null);
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
    <Stack>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Notes List</Typography>
        <Formik
          initialValues={{ newNote: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            if (values.newNote.trim() !== '') {
              const currentDate = new Date();
              addNote(values.newNote);
              actions.resetForm();
            }
          }}
        >
          {({ isSubmitting, values, touched, errors, handleChange, handleBlur, handleSubmit }) => (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  sx={{ mr: 2 }}
                  type="text"
                  name="newNote"
                  label="New Note"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newNote}
                  error={touched.newNote && Boolean(errors.newNote)}
                  helperText={touched.newNote && errors.newNote}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ height: 'auto' }}>
                  Add Note
                </Button>
              </Stack>

            </form>
          )}
        </Formik>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note: INote, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {index === editNoteIndex ? (
                    <Formik
                      initialValues={{ editedNote: note?.value }}
                      validationSchema={Yup.object().shape({
                        editedNote: Yup.string().required('This field is required'),
                      })}
                      onSubmit={saveEditedNote}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <Box>
                            <TextField
                              sx={{ mb: 1 }}
                              type="text"
                              name="editedNote"
                              label="Editar Nota"
                              variant="outlined"
                              value={editedNote?.value}
                              fullWidth
                              onChange={(e) => setEditedNote({
                                ...editedNote,
                                value: e.target.value,
                                date: new Date().toISOString(),
                              })}
                            />
                            < ErrorMessage name="editedNote" component="div" className="error-message" />
                          </Box>
                          <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                            <Button
                              type="submit"
                              variant="outlined"
                              color="primary"
                              startIcon={<Check sx={{ color: 'green' }} />}
                              fullWidth
                              sx={{ mr: 0.5 }}
                            >

                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => setEditNoteIndex(null)}
                              startIcon={<Close sx={{ color: 'red' }} />}
                              fullWidth
                              sx={{ ml: 0.5 }}
                            >

                            </Button>
                          </Box>

                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <>
                      {note?.value}
                    </>
                  )}
                </TableCell>
                <TableCell>{note?.date}</TableCell>
                <TableCell>
                  <IconButton onClick={() => editNote(index)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => openDeleteConfirmation(index)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Stack>
  );
}

export default NotePage;
