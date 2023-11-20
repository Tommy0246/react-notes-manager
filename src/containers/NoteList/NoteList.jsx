import { useDispatch, useSelector } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteApi } from "api/note-api";
import { deleteNote } from "store/note/note-slice";

export function NoteList({ noteList }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function deleteNote_(note) {
        if (window.confirm("Supprimer la note ?")) {
            await NoteApi.deleteById(note.id);
            dispatch(deleteNote(note.id));
        }
    }

    return (
        <div className={`row justify-content-center`}>
            {noteList.map((note) => {
                return (
                    <div key={note.id} className={s.card_container}>
                        <TextCard
                            title={note.title}
                            subtitle={note.subtitle}
                            content={note.content}
                            onClick={() => navigate("/note/" + note.id)}
                            onClickTrash={() => deleteNote_(note)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
