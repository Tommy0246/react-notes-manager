import { TextCard } from "components/TextCard/TextCard";
import s from "./sytle.module.css";
import { NoteList } from "containers/NoteList/NoteList";
import { SearchBar } from "components/SearchBar/SearchBar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function NoteBrowse(props) {
    const [searchText, setSearchText] = useState("");
    const noteList = useSelector((store) => store.NOTE.noteList);
    const filteredList = noteList.filter((note) => {
        const containsTitle = note.title
            .toUpperCase()
            .includes(searchText.trim().toUpperCase());

        const containsContent = note.content
            .toUpperCase()
            .includes(searchText.trim().toUpperCase());
        return containsTitle || containsContent;
    });
    return (
        <>
            <div className="row justify-content-center mb-5">
                <div className="col-sm-12 col-md-4">
                    <SearchBar
                        placeholder="Search your notes..."
                        onTextChange={setSearchText}
                    />
                </div>
            </div>
            {noteList.length === 0 && (
                <div className="d-flex justify-content-center">
                    <span>
                        Vous n'avez pas de note, voulez en{" "}
                        <Link to="/note/new">créer une</Link>
                    </span>
                </div>
            )}
            <NoteList noteList={filteredList} />
        </>
    );
}
