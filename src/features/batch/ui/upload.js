import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = (props) => {

    const {
        record,
        uploadFileIfNotBusy,
        ...rest
    } = props;

    const [fileList, setFileList] = useState([]);

    const handleOnRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const handleBeforeUpload = (file) => {

        setFileList([...fileList, file]);
        // const fileName = file.name;

        // const reader = new FileReader();
        // reader.readAsText(file);

        // reader.onload = (event) => {
        //     const fileContent = event.target.result;
        //     const data = {
        //         record: record,
        //         filename: fileName,
        //         content: btoa(fileContent)
        //     };

        //     uploadFileIfNotBusy(data);
        // };

        // Return false to prevent immediate upload
        return false;
    };

    const handleUpload = async () => {
        for (const file of fileList) {
            const fileContent = await readFileAsBase64(file);
            try {

                const data = {
                    record: record,
                    filename: file.name,
                    content: btoa(fileContent)
                };

                uploadFileIfNotBusy(data);

            } catch (error) {

                message.error(`File "${file.name}" upload failed.`);

            }
        }
        message.success('File(s) uploaded successfully!');
    };

    const readFileAsBase64 = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsText(file);
        });
    };

    return (
        <div>
            <Upload
                fileList={fileList}
                beforeUpload={handleBeforeUpload}
                onRemove={handleOnRemove}
            >
                <Button icon={<UploadOutlined />}>Select File(s)</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                style={{ marginTop: 16 }}
            >
                Upload
            </Button>
        </div>
    );
};

export default FileUpload;
