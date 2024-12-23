import React from 'react';
import { Edit, SimpleForm, TextInput, ImageField, FileInput, FileField } from 'react-admin';
export const DoctorEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="name" label="ФИО" />
                <ImageField
                    source="image"
                    label="Изображение"
                    title="image"
                    src={record => (record?.image ? `http://localhost:3000/uploads/${record.image}` : null)}
                />
                <FileInput source="image" label="Изображение" accept="image/*">
                    <FileField source="src" title="title" />
                </FileInput>
                <TextInput source="description" label="Описание" />
            </SimpleForm>
        </Edit>
    );
};