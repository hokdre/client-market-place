import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import moment from 'moment'
import { URL_GET_REPORT_ORDER } from '../../api/api'
import { H3 } from '../../components/UI_components/heading';
const STATUS_ORDER_MENUNGGU_PEMBAYARAN = "STATUS_ORDER_MENUNGGU_PEMBAYARAN"
const STATUS_ORDER_SEDANG_DIPROSES     = "STATUS_ORDER_SEDANG_DIPROSES"
const STATUS_ORDER_SEDANG_DIKIRIM      = "STATUS_ORDER_SEDANG_DIKIRIM"
const STATUS_ORDER_DI_CANCEL           = "STATUS_ORDER_DI_CANCEL"
const STATUS_ORDER_SELESAI = "STATUS_ORDER_SELESAI"
const MonthSummary = props => {
    let [report, setReport] = useState({
        [STATUS_ORDER_MENUNGGU_PEMBAYARAN] : 0,
        [STATUS_ORDER_SEDANG_DIPROSES] : 0,
        [STATUS_ORDER_SEDANG_DIKIRIM] : 0,
        [STATUS_ORDER_SELESAI] : 0,
        [STATUS_ORDER_DI_CANCEL] : 0
    })

    useEffect(() => {
        fetchReportMonthly()
    },[])

    const fetchReportMonthly = async () => {
        let date = new Date()
        let startDayOfMonth = moment(date).startOf('month').subtract(1, 'days').format(`YYYY-MM-DDThh:mm:ssZ`)
        let endDayOfMonth = moment(date).endOf('month').subtract(1, 'days').format(`YYYY-MM-DDThh:mm:ssZ`)
        console.log(`start day of month : ${startDayOfMonth}`)
        console.log(`end day of month : ${endDayOfMonth}`)
        let params = `?start=${encodeURIComponent(startDayOfMonth)}&end=${encodeURIComponent(endDayOfMonth)}`
        try{
            let response = await Axios.get(URL_GET_REPORT_ORDER(params), {
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            if(response.data.data){
                setReport({...report, ...response.data.data})
            }
        }catch(error){
            console.log(error)
        }

    }

    return (
        <div className="month-summary">

            <div className="month-summary__report">
                <H3 className="month-summary__title">Potensi Pesanan Masuk</H3>
                <span className="month-summary__number">
                    {report[STATUS_ORDER_MENUNGGU_PEMBAYARAN]}
                </span>
            </div>

            <div className="month-summary__report">
                <H3 className="month-summary__title">Pesanan Masuk</H3>
                <span className="month-summary__number">
                    {report[STATUS_ORDER_SEDANG_DIPROSES]}
                </span>
            </div>

            <div className="month-summary__report">
                <H3 className="month-summary__title">Pesanan Sedang Dikirim</H3>
                <span className="month-summary__number">
                    {report[STATUS_ORDER_SEDANG_DIKIRIM]}
                </span>
            </div>

            <div className="month-summary__report">
                <H3 className="month-summary__title">Pesanan Selesai</H3>
                <span className="month-summary__number">
                    {report[STATUS_ORDER_SELESAI]}
                </span>
            </div>

            <div className="month-summary__report">
                <H3 className="month-summary__title">Pesanan Batal</H3>
                <span className="month-summary__number">
                    {report[STATUS_ORDER_DI_CANCEL]}
                </span>
            </div>
        </div>
    )

}

export default MonthSummary