import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate  } from 'react-router-dom';

const baseURL = "http://127.0.0.1:8000/api/barang";
  
function TambahBarang (){

    const [nama, setNama] = useState('');
    const [stok, setStok] = useState('');
    const [harga, setHarga] = useState('');
    const [jenis, setJenis] = useState('');
    const [jenisbarang, setJenisbarang] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Tambah Barang';
        loadJenisBarang();
    },[]);

    const loadJenisBarang = () => {
        axios.get(`http://127.0.0.1:8000/api/jenis_barang?cari=&orderBy=asc`).then((response) => {
            setJenisbarang(response.data.data)
        });
    }

    const simpanBarang = async (e) => {
        e.preventDefault();

        await axios.post(baseURL, {
            nama_barang: nama,
            stok: stok,
            harga: harga,
            id_jenis_barang: jenis,
        })
        .then((res) => {
            console.log(res)
            navigate('/barang');
        })
        .catch((error) => {
            console.log(error)
        })        
    }

    return (
        <div>
            <h4>Tambah Barang</h4>
            <Link to="/barang" className="btn btn-light shadow-sm btn-sm mb-3">Kembali</Link>
            <form onSubmit={simpanBarang}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Nama Barang</label>
                    <div className="col-sm-5">
                        <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Stok</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" value={stok} onChange={(e) => setStok(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Harga Barang</label>
                    <div className="col-sm-3">
                        <input type="number" className="form-control" value={harga} onChange={(e) => setHarga(e.target.value)} required={true}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Jenis Barang</label>
                    <div className="col-sm-4">
                        <select className="form-control" value={jenis} onChange={(e) => setJenis(e.target.value)} required={true}>
                            <option value="">--Pilih--</option>
                            {
                                jenisbarang.map((data, index) => {
                                    return(
                                        <option value={data.id}>{data.nama_jenis_barang}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="offset-sm-2">
                        <button type="submit" className="btn btn-dark">Simpan</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
  
export default TambahBarang;