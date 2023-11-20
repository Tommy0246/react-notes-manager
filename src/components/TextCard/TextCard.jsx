import s from "./style.module.css";
import { useState } from "react";
import { Trash as TrashIcon } from "react-bootstrap-icons";

export function TextCard({ title, subtitle, content, onClickTrash, onClick }) {
    const [isCardHovered, setIsCardHover] = useState(false);
    const [isTrashHovered, setIsTrashHover] = useState(false);

    function onClickTrash_(e) {
        onClickTrash();
        e.stopPropagation();
    }

    return (
        <div
            className={s.container}
            onClick={onClick}
            onMouseEnter={() => {
                setIsCardHover(true);
            }}
            onMouseLeave={() => {
                setIsCardHover(false);
            }}
            className={`card ${s.container}`}
            style={{
                borderColor: isCardHovered ? "#0d6efd" : "transparent",
            }}
        >
            <div className="card-body">
                <div className={s.title_row}>
                    <h5 className="card-title">{title}</h5>
                    <TrashIcon
                        onClick={onClickTrash_}
                        size={20}
                        onMouseEnter={() => {
                            setIsTrashHover(true);
                        }}
                        onMouseLeave={() => {
                            setIsTrashHover(false);
                        }}
                        style={{
                            color: isTrashHovered ? "#ff7373" : "#b8b8b8",
                        }}
                    />
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <p className={`card-text ${s.text_content}`}>{content}</p>
            </div>
        </div>
    );
}
