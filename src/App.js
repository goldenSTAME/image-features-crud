import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // 维护表单输入状态
  const [imageId, setImageId] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [features, setFeatures] = useState('');
  const [result, setResult] = useState('');

  // 这里的 baseURL 要根据你 Flask 启动的服务地址来配置
  // 如果本地启动 Flask，端口是 5001，则是 http://localhost:5001
  // 如果你部署在远程服务器，请改成对应的域名 / IP
  const baseURL = 'http://localhost:5001';

  // 1. Create
  const handleCreate = async () => {
    if (!imageId || !imagePath || !features) {
      alert('请填写完整信息后再创建！');
      return;
    }
    try {
      const resp = await axios.post(`${baseURL}/image_features`, {
        image_id: imageId,
        image_path: imagePath,
        features: features,
      });
      if (resp.data.success) {
        alert(resp.data.message); // "创建记录成功（image_id=xxx）"
      } else {
        alert(resp.data.message || '创建失败');
      }
    } catch (err) {
      console.error('创建记录失败', err);
      alert('创建记录失败，请查看控制台报错信息。');
    }
  };

  // 2. Read
  const handleRead = async () => {
    if (!imageId) {
      alert('请至少填写 Image ID 才能查询！');
      return;
    }
    try {
      const resp = await axios.get(`${baseURL}/image_features/${imageId}`);
      if (resp.data.success) {
        setResult(JSON.stringify(resp.data.data, null, 2));
      } else {
        setResult('没有查询到相关记录');
      }
    } catch (err) {
      console.error('查询记录失败', err);
      setResult('查询出错，请查看控制台报错信息。');
    }
  };

  // 3. Update
  const handleUpdate = async () => {
    if (!imageId || !imagePath || !features) {
      alert('请填写完整信息后再更新！');
      return;
    }
    try {
      const resp = await axios.put(`${baseURL}/image_features/${imageId}`, {
        new_path: imagePath,
        new_features: features,
      });
      if (resp.data.success) {
        alert(resp.data.message); // "更新记录成功（image_id=xxx）"
      } else {
        alert(resp.data.message || '更新失败');
      }
    } catch (err) {
      console.error('更新记录失败', err);
      alert('更新记录失败，请查看控制台报错信息。');
    }
  };

  // 4. Delete
  const handleDelete = async () => {
    if (!imageId) {
      alert('请至少填写 Image ID 才能删除！');
      return;
    }
    try {
      const resp = await axios.delete(`${baseURL}/image_features/${imageId}`);
      if (resp.data.success) {
        alert(resp.data.message); // "删除记录成功（image_id=xxx）"
      } else {
        alert(resp.data.message || '删除失败');
      }
    } catch (err) {
      console.error('删除记录失败', err);
      alert('删除记录失败，请查看控制台报错信息。');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h1>Image Features CRUD (React + Flask)</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Image ID: </label>
        <input
          type="text"
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Image Path: </label>
        <input
          type="text"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Features: </label>
        <input
          type="text"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleCreate} style={{ marginRight: '10px' }}>Create</button>
        <button onClick={handleRead} style={{ marginRight: '10px' }}>Read</button>
        <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div>
        <h3>Result:</h3>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
          {result}
        </pre>
      </div>
    </div>
  );
}

export default App;