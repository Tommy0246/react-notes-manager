import { NoteForm } from "components/NoteForm/NoteForm";
import s from "./sytle.module.css";
import { NoteApi } from "api/note-api";
import { useDispatch } from "react-redux";
import { addNote } from "store/note/note-slice";
import { useNavigate } from "react-router-dom";

export function NoteCreate(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function createNote(formValues) {
        const createdNote = await NoteApi.create({
            ...formValues,
            created_at: new Date().toLocaleDateString(),
        });
        dispatch(addNote(createdNote));
        navigate("/");
    }

    return (
        <>
            <NoteForm title="create a note" onSubmit={createNote} />
        </>
    );
}
