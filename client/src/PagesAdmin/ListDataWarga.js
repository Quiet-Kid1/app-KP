import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container,
  Button,
  Row,
  Col,
  Dropdown,
  SplitButton,
} from 'react-bootstrap';
import MUIDataTable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { listwargas, deleteWarga } from '../actions/wargaAction';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listKeluargas } from '../actions/keluargaAction';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ListDataWarga = props => {
  const dispatch = useDispatch();

  //cek store untuk mengetahui state.userLogin darimana
  const wargaList = useSelector(state => state.wargaList);
  const { loading, listWarga } = wargaList;

  //cek store untuk mengetahui state.userLogin darimana
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  //cek store untuk mengetahui state.userLogin darimana
  const wargaDelete = useSelector(state => state.wargaDelete);
  const { error: errorDelete, success: successDelete } = wargaDelete;

  const keluargaList = useSelector(state => state.keluargaList);
  const { loading: loadingKeluarga, listKeluarga } = keluargaList;

  useEffect(() => {
    if (userInfo === null) {
      props.history.push('/admin/login');
    }
    dispatch(listKeluargas());
    dispatch(listwargas());
  }, [dispatch, props.history, successDelete, userInfo]);

  const deleteHandler = id => {
    if (window.confirm('Apakah kamu yakin ?')) {
      dispatch(deleteWarga(id));
    }
  };

  //admin kepala lingkungan

  const getExportPALASU = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (userInfo.pala === item.lingkungan) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;

      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportPALASU = getExportPALASU.filter(item => item !== false);

  const getExportPalaBalita = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (userInfo.pala === item.lingkungan) {
      if (item.UmurWarga >= 1 && item.UmurWarga <= 5) {
        var ktp = item.no_ktp;
        var keluarga = noKK;
        var nama = item.nama;
        var agama = item.tanggal_lahir.substring(0, 10);
        var t_lahir = item.t_lahir;
        var UmurWarga = item.UmurWarga;
        var j_kelamin = item.j_kelamin;
        var gol_darah = kecamatan;
        var pekerjaan = kelurahan;
        var lingkungan = item.lingkungan;
        var pendidikan = item.pendidikan;
        var job = item.pekerjaan;
        var religion = item.agama;

        return {
          no_ktp: ktp,
          keluarga: keluarga,
          nama: nama,
          agama: agama,
          t_lahir: t_lahir,
          UmurWarga: UmurWarga,
          j_kelamin: j_kelamin,
          gol_darah: gol_darah,
          pekerjaan: pekerjaan,
          pendidikan: pendidikan,
          job: job,
          lingkungan: lingkungan,
          religion: religion,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const dataExportPalaBalita = getExportPalaBalita.filter(
    item => item !== false
  );

  const getExportPalaKanak = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (userInfo.pala === item.lingkungan) {
      if (item.UmurWarga >= 6 && item.UmurWarga <= 11) {
        var ktp = item.no_ktp;
        var keluarga = noKK;
        var nama = item.nama;
        var agama = item.tanggal_lahir.substring(0, 10);
        var t_lahir = item.t_lahir;
        var UmurWarga = item.UmurWarga;
        var j_kelamin = item.j_kelamin;
        var gol_darah = kecamatan;
        var pekerjaan = kelurahan;
        var lingkungan = item.lingkungan;
        var pendidikan = item.pendidikan;
        var job = item.pekerjaan;
        var religion = item.agama;

        return {
          no_ktp: ktp,
          keluarga: keluarga,
          nama: nama,
          agama: agama,
          t_lahir: t_lahir,
          UmurWarga: UmurWarga,
          j_kelamin: j_kelamin,
          gol_darah: gol_darah,
          pekerjaan: pekerjaan,
          pendidikan: pendidikan,
          job: job,
          lingkungan: lingkungan,
          religion: religion,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const dataExportPalaKanak = getExportPalaKanak.filter(item => item !== false);

  const getExportPalaRemaja = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }

    if (userInfo.pala === item.lingkungan) {
      if (item.UmurWarga >= 12 && item.UmurWarga <= 25) {
        var ktp = item.no_ktp;
        var keluarga = noKK;
        var nama = item.nama;
        var agama = item.tanggal_lahir.substring(0, 10);
        var t_lahir = item.t_lahir;
        var UmurWarga = item.UmurWarga;
        var j_kelamin = item.j_kelamin;
        var gol_darah = kecamatan;
        var pekerjaan = kelurahan;
        var lingkungan = item.lingkungan;
        var pendidikan = item.pendidikan;
        var job = item.pekerjaan;
        var religion = item.agama;

        return {
          no_ktp: ktp,
          keluarga: keluarga,
          nama: nama,
          agama: agama,
          t_lahir: t_lahir,
          UmurWarga: UmurWarga,
          j_kelamin: j_kelamin,
          gol_darah: gol_darah,
          pekerjaan: pekerjaan,
          pendidikan: pendidikan,
          job: job,
          lingkungan: lingkungan,
          religion: religion,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const dataExportPalaRemaja = getExportPalaRemaja.filter(
    item => item !== false
  );

  const getExportPalaDewasa = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (userInfo.pala === item.lingkungan) {
      if (item.UmurWarga >= 26 && item.UmurWarga <= 45) {
        var ktp = item.no_ktp;
        var keluarga = noKK;
        var nama = item.nama;
        var agama = item.tanggal_lahir.substring(0, 10);
        var t_lahir = item.t_lahir;
        var UmurWarga = item.UmurWarga;
        var j_kelamin = item.j_kelamin;
        var gol_darah = kecamatan;
        var pekerjaan = kelurahan;
        var lingkungan = item.lingkungan;
        var pendidikan = item.pendidikan;
        var job = item.pekerjaan;
        var religion = item.agama;

        return {
          no_ktp: ktp,
          keluarga: keluarga,
          nama: nama,
          agama: agama,
          t_lahir: t_lahir,
          UmurWarga: UmurWarga,
          j_kelamin: j_kelamin,
          gol_darah: gol_darah,
          pekerjaan: pekerjaan,
          pendidikan: pendidikan,
          job: job,
          lingkungan: lingkungan,
          religion: religion,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const dataExportPalaDewasa = getExportPalaDewasa.filter(
    item => item !== false
  );

  const getExportPalaLansia = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (userInfo.pala === item.lingkungan) {
      if (item.UmurWarga >= 46 && item.UmurWarga <= 65) {
        var ktp = item.no_ktp;
        var keluarga = noKK;
        var nama = item.nama;
        var agama = item.tanggal_lahir.substring(0, 10);
        var t_lahir = item.t_lahir;
        var UmurWarga = item.UmurWarga;
        var j_kelamin = item.j_kelamin;
        var gol_darah = kecamatan;
        var pekerjaan = kelurahan;
        var lingkungan = item.lingkungan;
        var pendidikan = item.pendidikan;
        var job = item.pekerjaan;
        var religion = item.agama;

        return {
          no_ktp: ktp,
          keluarga: keluarga,
          nama: nama,
          agama: agama,
          t_lahir: t_lahir,
          UmurWarga: UmurWarga,
          j_kelamin: j_kelamin,
          gol_darah: gol_darah,
          pekerjaan: pekerjaan,
          pendidikan: pendidikan,
          job: job,
          lingkungan: lingkungan,
          religion: religion,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const dataExportPalaLansia = getExportPalaLansia.filter(
    item => item !== false
  );

  const getExportPalaManula = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (userInfo.pala === item.lingkungan) {
      if (item.UmurWarga >= 66) {
        var ktp = item.no_ktp;
        var keluarga = noKK;
        var nama = item.nama;
        var agama = item.tanggal_lahir.substring(0, 10);
        var t_lahir = item.t_lahir;
        var UmurWarga = item.UmurWarga;
        var j_kelamin = item.j_kelamin;
        var gol_darah = kecamatan;
        var pekerjaan = kelurahan;
        var lingkungan = item.lingkungan;
        var pendidikan = item.pendidikan;
        var job = item.pekerjaan;
        var religion = item.agama;

        return {
          no_ktp: ktp,
          keluarga: keluarga,
          nama: nama,
          agama: agama,
          t_lahir: t_lahir,
          UmurWarga: UmurWarga,
          j_kelamin: j_kelamin,
          gol_darah: gol_darah,
          pekerjaan: pekerjaan,
          pendidikan: pendidikan,
          job: job,
          lingkungan: lingkungan,
          religion: religion,
        };
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const dataExportPalaManula = getExportPalaManula.filter(
    item => item !== false
  );

  // Admin Lurah dan Sekertaris Lurah
  const dataExport = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }

    var ktp = item.no_ktp;
    var keluarga = noKK;
    var nama = item.nama;
    var agama = item.tanggal_lahir.substring(0, 10);
    var t_lahir = item.t_lahir;
    var UmurWarga = item.UmurWarga;
    var j_kelamin = item.j_kelamin;
    var gol_darah = kecamatan;
    var pekerjaan = kelurahan;
    var lingkungan = item.lingkungan;
    var pendidikan = item.pendidikan;
    var job = item.pekerjaan;
    var religion = item.agama;

    return {
      no_ktp: ktp,
      keluarga: keluarga,
      nama: nama,
      agama: agama,
      t_lahir: t_lahir,
      UmurWarga: UmurWarga,
      j_kelamin: j_kelamin,
      gol_darah: gol_darah,
      pekerjaan: pekerjaan,
      lingkungan: lingkungan,
      pendidikan: pendidikan,
      job: job,
      lingkungan: lingkungan,
      religion: religion,
    };
  });

  const getExportBalita = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (item.UmurWarga >= 1 && item.UmurWarga <= 5) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;

      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        lingkungan: lingkungan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportBalita = getExportBalita.filter(item => item !== false);

  const getExportKanak = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (item.UmurWarga >= 6 && item.UmurWarga <= 11) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;
      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        lingkungan: lingkungan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportKanak = getExportKanak.filter(item => item !== false);

  const getExportRemaja = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (item.UmurWarga >= 12 && item.UmurWarga <= 25) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;
      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        lingkungan: lingkungan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportRemaja = getExportRemaja.filter(item => item !== false);

  const getExportDewasa = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (item.UmurWarga >= 26 && item.UmurWarga <= 45) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;
      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        lingkungan: lingkungan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportDewasa = getExportDewasa.filter(item => item !== false);

  const getExportLansia = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (item.UmurWarga >= 46 && item.UmurWarga <= 65) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;
      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        lingkungan: lingkungan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportLansia = getExportLansia.filter(item => item !== false);

  const getExportManula = listWarga.map(item => {
    if (item.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = item.no_keluarga[0].no_kk;
      var kecamatan = item.no_keluarga[0].kecamatan;
      var kelurahan = item.no_keluarga[0].kelurahan;
    }
    if (item.UmurWarga >= 66) {
      var ktp = item.no_ktp;
      var keluarga = noKK;
      var nama = item.nama;
      var agama = item.tanggal_lahir.substring(0, 10);
      var t_lahir = item.t_lahir;
      var UmurWarga = item.UmurWarga;
      var j_kelamin = item.j_kelamin;
      var gol_darah = kecamatan;
      var pekerjaan = kelurahan;
      var lingkungan = item.lingkungan;
      var pendidikan = item.pendidikan;
      var job = item.pekerjaan;
      var religion = item.agama;

      return {
        no_ktp: ktp,
        keluarga: keluarga,
        nama: nama,
        agama: agama,
        t_lahir: t_lahir,
        UmurWarga: UmurWarga,
        j_kelamin: j_kelamin,
        gol_darah: gol_darah,
        pekerjaan: pekerjaan,
        lingkungan: lingkungan,
        pendidikan: pendidikan,
        job: job,
        lingkungan: lingkungan,
        religion: religion,
      };
    } else {
      return false;
    }
  });

  const dataExportManula = getExportManula.filter(item => item !== false);

  const rows = listWarga.map(warga => {
    if (userInfo.role === 'Lurah' || userInfo.role === 'Sekertaris') {
      var authorizeEdit = (
        <LinkContainer to={`/admin/${warga._id}/edit`}>
          <Button variant="outline-primary">
            <i className="fas fa-edit"></i>
          </Button>
        </LinkContainer>
      );
      var authorizeDelete = (
        <Button
          variant="outline-danger"
          onClick={() => deleteHandler(warga._id)}
        >
          <i className="fas fa-trash"></i>
        </Button>
      );
    } else {
      if (userInfo.pala === warga.lingkungan) {
        authorizeEdit = (
          <LinkContainer to={`/admin/${warga._id}/edit`}>
            <Button variant="outline-primary">
              <i className="fas fa-edit"></i>
            </Button>
          </LinkContainer>
        );
        authorizeDelete = (
          <Button
            variant="outline-danger"
            onClick={() => deleteHandler(warga._id)}
          >
            <i className="fas fa-trash"></i>
          </Button>
        );
      }
    }

    // var checkKeluarga = listKeluarga.find(
    //   keluarga => keluarga.no_kk === warga.no_keluarga[0].no_kk
    // );
    // if (checkKeluarga) {
    //   var nikKK = warga.no_keluarga[0].no_kk;
    // } else {
    //   var nikKK = 'Nik Keluarga telah dihapus/diubah';
    // }

    if (warga.no_keluarga.length == 0) {
      var noKK = 'nomor kk telah dihapus dari data keluarga';
    } else {
      var noKK = warga.no_keluarga[0].no_kk;
    }

    return {
      no_ktp: warga.no_ktp,
      no_keluarga: noKK,
      nama: warga.nama,
      agama: warga.agama,
      t_lahir: warga.t_lahir,
      tanggal_lahir: warga.tanggal_lahir.substring(0, 10),
      umurWarga: warga.UmurWarga,
      j_kelamin: warga.j_kelamin,
      gol_darah: warga.gol_darah,
      pekerjaan: warga.pekerjaan,
      pendidikan: warga.pendidikan,
      lingkungan: warga.lingkungan,
      s_nikah: warga.s_nikah,
      status: warga.status,
      edit: authorizeEdit,
      hapus: authorizeDelete,
    };
  });

  const columns = [
    {
      label: 'Nomor NIK',
      name: 'no_ktp',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Nomor KK',
      name: 'no_keluarga',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Nama',
      name: 'nama',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Agama',
      name: 'agama',
      options: {
        filter: true,
        sort: true,
        display: 'false',
      },
    },
    {
      label: 'Tempat Lahir',
      name: 't_lahir',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Tanggal Lahir',
      name: 'tanggal_lahir',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Umur',
      name: 'umurWarga',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Jenis Kelamin',
      name: 'j_kelamin',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Golongan Darah',
      name: 'gol_darah',
      options: {
        filter: true,
        sort: true,
        display: 'false',
      },
    },
    {
      label: 'Pekerjaan',
      name: 'pekerjaan',
      options: {
        filter: true,
        sort: true,
        display: 'false',
      },
    },
    {
      label: 'Pendidikan',
      name: 'pendidikan',
      options: {
        filter: true,
        sort: true,
        display: 'false',
      },
    },
    {
      label: 'Lingkungan',
      name: 'lingkungan',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Status Nikah',
      name: 's_nikah',
      options: {
        filter: true,
        sort: true,
        display: 'false',
      },
    },
    {
      label: 'Status',
      name: 'status',
      options: {
        filter: true,
        sort: true,
        display: 'false',
      },
    },
    {
      label: 'Ubah',
      name: 'edit',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      label: 'Hapus',
      name: 'hapus',
      options: {
        filter: false,
        sort: false,
      },
    },
  ];
  const options = {
    download: false,
    print: false,
    textLabels: {
      body: {
        noMatch: 'Maaf, data penduduk tidak ada',
        toolTip: 'Sort',
      },
      pagination: {
        next: 'Halaman Berikutnya',
        previous: 'Halaman Sebelumnya',
        rowsPerPage: 'Baris Perhalaman:',
        displayRows: 'dari',
      },
      toolbar: {
        search: 'cari',
        viewColumns: 'Lihat Kolom',
        filterTable: 'Filter Tabel',
      },
      filter: {
        all: 'Semua',
        title: 'filter',
        reset: 'reset',
      },
      viewColumns: {
        title: 'lihat kolom',
      },
      selectedRows: {
        text: 'baris yang dihapus',
        delete: 'Hapus',
      },
    },
  };
  console.log(listWarga);
  return (
    <>
      {!userInfo ? (
        <div>Silahkan Login terlebih dahulu</div>
      ) : (
        <div className="py-5">
          <Container>
            <Row className="align-items-center">
              <Col>
                <h2>Daftar Penduduk Kelurahan Malalayang I</h2>
              </Col>
              <Col className="text-right">
                <LinkContainer to={`/admin/create/warga`}>
                  <Button>
                    <i className="fas fa-plus"></i> Tambah Data Penduduk
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
            <Row>
              <Col className="text-left">
                {!userInfo.pala ? (
                  <div>
                    <SplitButton
                      key="right"
                      id={`dropdown-button-drop-right}`}
                      drop="right"
                      variant="success"
                      title={`Export Excel Berdasarkan Golongan Umur Penduduk`}
                    >
                      <Dropdown.Item eventKey="1">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Semua Umur Penduduk (SU)
                              </Button>
                            }
                            filename="Data Penduduk"
                          >
                            <ExcelSheet data={dataExport} name="Data Penduduk">
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />

                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 1 - 5 Tahun (Balita)
                              </Button>
                            }
                            filename="Data Penduduk Balita"
                          >
                            <ExcelSheet
                              data={dataExportBalita}
                              name="Data Penduduk Balita"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 6 - 11 Tahun (Kanak-Kanak)
                              </Button>
                            }
                            filename="Data Penduduk Kanak-Kanak"
                          >
                            <ExcelSheet
                              data={dataExportKanak}
                              name="Data Penduduk Balita"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="4">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 12 - 25 Tahun (Remaja)
                              </Button>
                            }
                            filename="Data Penduduk Remaja"
                          >
                            <ExcelSheet
                              data={dataExportRemaja}
                              name="Data Penduduk Remaja"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="5">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 26 - 45 Tahun (Dewasa)
                              </Button>
                            }
                            filename="Data Penduduk Dewasa"
                          >
                            <ExcelSheet
                              data={dataExportDewasa}
                              name="Data Penduduk Dewasa"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="4">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 46 - 65 Tahun (Lansia)
                              </Button>
                            }
                            filename="Data Penduduk Lansia"
                          >
                            <ExcelSheet
                              data={dataExportLansia}
                              name="Data Penduduk Lansia"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="5">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 66-atas Tahun (Manula)
                              </Button>
                            }
                            filename="Data Penduduk Manula"
                          >
                            <ExcelSheet
                              data={dataExportManula}
                              name="Data Penduduk Manula"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Lingkungan"
                                value="lingkungan"
                              />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                    </SplitButton>
                  </div>
                ) : (
                  <div>
                    <SplitButton
                      key="right"
                      id={`dropdown-button-drop-right}`}
                      drop="right"
                      variant="success"
                      title={`Export Excel Berdasarkan Golongan Umur Penduduk`}
                    >
                      <Dropdown.Item eventKey="0">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Semua Umur Penduduk (SU)
                              </Button>
                            }
                            filename={`Data Penduduk ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPALASU}
                              name="Data Penduduk"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="1">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 1 - 5 Tahun (Balita)
                              </Button>
                            }
                            filename={`Data Penduduk Balita ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPalaBalita}
                              name="Data Penduduk Balita"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 6 - 11 Tahun (Kanak-Kanak)
                              </Button>
                            }
                            filename={`Data Penduduk Kanak-Kanak ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPalaKanak}
                              name="Data Penduduk Kanak-Kanak"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 12 - 25 Tahun (Remaja)
                              </Button>
                            }
                            filename={`Data Penduduk Remaja ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPalaRemaja}
                              name="Data Penduduk Remaja"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="4">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 26 - 45 Tahun (Dewasa)
                              </Button>
                            }
                            filename={`Data Penduduk Dewasa ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPalaDewasa}
                              name="Data Penduduk Dewasa"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="5">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 46 - 65 Tahun (Lansia)
                              </Button>
                            }
                            filename={`Data Penduduk Lansia ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPalaLansia}
                              name="Data Penduduk Dewasa"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="6">
                        {
                          <ExcelFile
                            element={
                              <Button variant="outline-success">
                                Penduduk berumur 66-atas Tahun (Manula)
                              </Button>
                            }
                            filename={`Data Penduduk Manula ${userInfo.pala}`}
                          >
                            <ExcelSheet
                              data={dataExportPalaManula}
                              name="Data Penduduk Dewasa"
                            >
                              <ExcelColumn label="Nomor KTP" value="no_ktp" />
                              <ExcelColumn label="Nomor KK" value="keluarga" />
                              <ExcelColumn label="Nama" value="nama" />
                              <ExcelColumn
                                label="Tanggal Lahir"
                                value="agama"
                              />
                              <ExcelColumn
                                label="Tempat Lahir"
                                value="t_lahir"
                              />
                              <ExcelColumn label="Umur" value="UmurWarga" />
                              <ExcelColumn
                                label="Jenis Kelamin"
                                value="j_kelamin"
                              />
                              <ExcelColumn
                                label="Pendidikan"
                                value="pendidikan"
                              />
                              <ExcelColumn label="Pekerjaan" value="job" />
                              <ExcelColumn label="Agama" value="religion" />
                              <ExcelColumn
                                label="Kecamatan"
                                value="gol_darah"
                              />
                              <ExcelColumn
                                label="Kelurahan"
                                value="pekerjaan"
                              />
                            </ExcelSheet>
                          </ExcelFile>
                        }
                      </Dropdown.Item>
                    </SplitButton>
                  </div>
                )}
              </Col>
            </Row>
            <br />
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading && loadingKeluarga ? (
              <Loader />
            ) : (
              <MUIDataTable data={rows} columns={columns} options={options} />
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default ListDataWarga;
