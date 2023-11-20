import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import s from "./style.module.css";
import { Pen, PencilFill, Trash, TrashFill } from "react-bootstrap-icons";
import { useState } from "react";
import { ValidatorService } from "services/form-validator";
import { FieldError } from "components/FieldError/FieldError";

const VALIDATOR = {
    title: (value) => {
        return (
            ValidatorService.min(value, 3) || ValidatorService.max(value, 20)
        );
    },
    content: (value) => {
        return ValidatorService.min(value, 3);
    },
};

export function NoteForm({
    isEditable = true,
    title,
    onClickEdit,
    onClickTrash,
    onSubmit,
    note,
}) {
    const [formValues, setFormValues] = useState({
        title: note?.title || "",
        content: note?.content || "",
    });
    const [formErrors, setFormErrors] = useState({
        title: note?.title ? undefined : "",
        content: note?.content ? undefined : "",
    });

    function hasError() {
        return Object.values(formErrors).some((error) => error !== undefined);
    }

    function updateFormValues(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        validate(e.target.name, e.target.value);
    }
    function validate(fieldName, fieldValue) {
        setFormErrors({
            ...formErrors,
            [fieldName]: VALIDATOR[fieldName](fieldValue),
        });
    }

    const actionIcons = (
        <>
            <div className="col-1">
                {onClickEdit && (
                    <PencilFill className={s.icon} onClick={onClickEdit} />
                )}
            </div>
            <div className="col-1">
                {onClickTrash && (
                    <TrashFill className={s.icon} onClick={onClickTrash} />
                )}
            </div>
        </>
    );

    const titleInput = (
        <div className="mb-5">
            <label className="form-label">Title</label>
            <input
                onChange={updateFormValues}
                type="text"
                name="title"
                className="form-control"
                value={formValues.title}
            />
            <FieldError msg={formErrors.title} />
        </div>
    );

    const contentInput = (
        <div className="mb-5">
            <label className="form-label">Content</label>
            <textarea
                onChange={updateFormValues}
                type="text"
                name="content"
                className="form-control"
                row="5"
                value={formValues.content}
            />
            <FieldError msg={formErrors.content} />
        </div>
    );

    const submitInput = (
        <>
            <div className={s.submit_btn}>
                <ButtonPrimary
                    isDisabled={hasError()}
                    onClick={() => onSubmit(formValues)}
                >
                    Submit
                </ButtonPrimary>
            </div>
        </>
    );

    return (
        <form className={s.container}>
            <div className="row justify-ccreate a noteontent-space-between">
                <div className="col-10">
                    <h2 className="mb-3">{title}</h2>
                </div>
                {onClickEdit ? actionIcons : ""}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>
                {isEditable && titleInput}
            </div>
            <div className="mb-3">
                {isEditable ? contentInput : <pre>{note.content}</pre>}
            </div>
            {onSubmit && submitInput}
        </form>
    );
}
