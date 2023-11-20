import { useNavigate, useParams } from "react-router-dom";
import s from "./sytle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { NoteApi } from "api/note-api";
import { updateNote, deleteNote } from "store/note/note-slice";

export function Note(props) {
    const dispatch = useDispatch();
    const [isEditable, setIsEditable] = useState(false);
    const { noteId } = useParams();
    const navigate = useNavigate();
    const note = useSelector((store) =>
        store.NOTE.noteList.find((note) => note.id === noteId)
    );

    async function submit(formValues) {
        const updatedNote = await NoteApi.update({ ...formValues, id: noteId });
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    }

    async function deleteNote_(note) {
        if (window.confirm("Supprimer la note ?")) {
            await NoteApi.deleteById(note.id);
            dispatch(deleteNote(note.id));
            navigate("/");
        }
    }

    return (
        <>
            {note && (
                <NoteForm
                    title={isEditable ? "Edit Note" : note.title}
                    isEditable={isEditable}
                    note={note}
                    onClickEdit={() => setIsEditable(!isEditable)}
                    onClickTrash={() => deleteNote_(note)}
                    onSubmit={isEditable && submit}
                ></NoteForm>
            )}
        </>
    );
}
