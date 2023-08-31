import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const draggerprops = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const FileUpload = (props) => {

    const {
        record,
        fetchBatchesIfNotBusy,
        accessToken,
        ...rest
    } = props;

    const [fileList, setFileList] = useState([]);

    const handleOnRemove = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const handleOnChange = (info) => {
        setFileList(info.fileList);
    };

    const handleBeforeUpload = async (file) => {

        try {

            setFileList([...fileList, file]);

            const fileName = file.name;

            file.status = "uploading";

            const fileContent = await readFile(file);

            const data = {
                record: record,
                filename: fileName,
                content: btoa(fileContent)
            };

            await uploadFile(data);

            file.status = "done";

            // Return false to prevent immediate upload
            return false;

        } catch (error) {

            file.status = "error";
            // message.error(`File "${file.name}" upload failed.`);

        }
        
    };

    const handleUpload = async () => {

        for (const file of fileList) {

            try {
                
                file.status = "uploading";
                const fileContent = await readFile(file.originFileObj);
            

                const data = {
                    record: record,
                    filename: file.name,
                    content: btoa(fileContent)
                };

                await uploadFile(data);
                

            } catch (error) {
                file.status = "error";
            }
            file.status = "done";
            // message.success(`File "${file.name}" uploaded successfully!`);
        }

        fetchBatchesIfNotBusy();
    };

    const uploadFile = (data) => {

        return new Promise((resolve) => {

            const resourceUrl = process.env.REACT_APP_API + 'api/batches/';

            let url = resourceUrl + data.record.id + '/files'

            const myHeaders = new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + accessToken.getAccessToken() });

            const body = JSON.stringify(data);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: body,
                redirect: 'follow'
            }

            fetch(url, requestOptions)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.statusText);
                    } else {
                        return res.json()
                    }
                })
                .then(
                    (json) => { resolve(json) }
                )
                .catch(
                    (error) => { throw new Error(error.message); }
                )

        });
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
            reader.readAsText(file);
        });
    };

    return (
        <div>
            {/* <Upload
                fileList={fileList}
                beforeUpload={handleBeforeUpload}
                onRemove={handleOnRemove}
                multiple ={true}
            >
                <Button icon={<UploadOutlined />}>Select File(s)</Button>
            </Upload> */}

            <Dragger
                name='file'
                fileList={fileList}
                beforeUpload={handleBeforeUpload}
                //   onRemove={handleOnRemove}
                onChange={handleOnChange}
                multiple={true}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag files to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                </p>
            </Dragger>
            {/* <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                style={{ marginTop: 16 }}
            >
                Upload
            </Button> */}
        </div>
    );
};

export default FileUpload;