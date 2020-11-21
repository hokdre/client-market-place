import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import moment from 'moment';
import Axios from 'axios';
import { ResponsiveContainer,LineChart, Line, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import {URL_GET_ESTIMASI_PENDAPATAN_ORDER } from "../../api/api"
let SATUAN = "RIBU (IDR)"


const MONTHS = {
    0 : "Januari",
    1 : "Februari",
    2 : "Maret",
    3 : "April",
    4 : "Mei",
    5 : "Juni",
    6 : "Juli",
    7 : "Agustus",
    8 : "September",
    9 : "Oktober",
    10 : "November",
    11 : "Desember"
}

const CustomizeToolTipContent = ({active, payload }) => {
    if(active){
        let {label, total } = payload[0].payload
        let weekNumber = 0
        let startDay = label.split("-")[0]
        if (startDay === "1") weekNumber = 1
        else if (startDay === "8") weekNumber = 2
        else if (startDay === "15") weekNumber = 3
        else if (startDay === "22") weekNumber = 4
        return (
           <div style={{
               backgroundColor : "#efefef",
               padding : "1rem",
               border : "1px solid #efefef",
               borderRadius : '9px',
               textAlign : "center"
            }}>
               <p style={{
                   color : "rgba(0, 0, 0, .87)",
                   fontSize : "2rem", 
                   fontWeight : 800 }}>
                       {`Minggu ke - ${weekNumber}`}
                </p>

                <p style={{
                    color : "#333333"
                }}> 
                Estimasi Omset : 
                </p>
                <p style={{
                    color : "#FA591D",
                    fontSize : "3rem", 
                    fontWeight : 800
                }}>
                {`Rp. ${total} ${SATUAN}`}
                </p>
           </div>
        )
    }
}

const EstimasiPendapatan = props => {
    let [year, setYear] = useState("")
    let [month, setMonth] = useState("")

    let [showOption, setShowOption] = useState(false)
    const toogleOption = () => setShowOption(!showOption)
    const closeOption = () => setShowOption(false)

    useEffect(() => {
        let today = new Date()
        setMonth(today.getMonth())
        setYear(today.getFullYear())
        fetchEstimasi(today.getFullYear(), today.getMonth())
     },[])

    let optionBoxRef = useRef()
    useEffect(() => {
        function handleClickOutSide(event){
            if (optionBoxRef.current && !optionBoxRef.current.contains(event.target)) {
                closeOption()
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () =>  document.removeEventListener("mousedown", handleClickOutSide);

    },[optionBoxRef])

    let [reports, setReports] = useState([])
    const SATUAN_RIBU = "RIBU (IDR)"
    const SATUAN_JUTA = "JUTA (IDR)"
    let [satuan, setSatuan] = useState(SATUAN_RIBU)
    const getSatuan = (reports ) => {
        if(reports){
            const satuanJuta = 1000000            
            let satuan = SATUAN_RIBU
            reports.forEach(report => {
                if (report.total > satuanJuta){
                    satuan = SATUAN_JUTA
                }
            })
           return satuan           
        }
    }
    const truncateData = (reports, satuan = SATUAN_RIBU) => {
        let divider = 1000
        if(satuan === SATUAN_JUTA) divider = 1000000
        return reports.map(report => {
            return {
                ...report,
                total : report.total / divider
            }
        })
    }
    const fetchEstimasi = async (year, month) => {
        let date = new Date(year, month)
        let startDayOfMonth = moment(date).startOf('month').subtract(1, 'days').format(`YYYY-MM-DDThh:mm:ssZ`)
        let endDayOfMonth = moment(date).endOf('month').subtract(1, 'days').format(`YYYY-MM-DDThh:mm:ssZ`)
        console.log(`start day of month : ${startDayOfMonth}`)
        console.log(`end day of month : ${endDayOfMonth}`)

        try{
            let params = `?start=${encodeURIComponent(startDayOfMonth)}&end=${encodeURIComponent(endDayOfMonth)}`
            let response = await Axios.get(URL_GET_ESTIMASI_PENDAPATAN_ORDER(params),{
                headers : {
                    token : localStorage.getItem("token")
                }
            })
            if(response.data.data){
                let satuan = getSatuan(response.data.data)
                SATUAN = satuan
                let truncatedData = truncateData(response.data.data, satuan)
                setReports(truncatedData)

                setSatuan(satuan)

            }else {
                setReports([])
                setSatuan(SATUAN_RIBU)
                SATUAN = SATUAN_RIBU
            }
            console.log(response.data.data)
        }catch(error){
        }
    }

    const changeMonth = (key) => {
        console.log(`key : ${key} ${typeof key}`)
        setMonth(Number(key))
        fetchEstimasi(year, key)
        closeOption()
    }


    return (
        <div className="estimasi-pendapatan">
            <div className="estimasi-pendapatan__header">
                <span className="estimasi-pendapatan__year">{year}</span>
                
                <div ref={optionBoxRef} className="estimasi-pendapatan__month">

                    <div onClick={toogleOption} className="estimasi-pendapatan__button">
                        <span className="estimasi-pendapatan__selected-month">{MONTHS[month]}</span>
                        <span className="estimasi-pendapatan__icon">
                            { !showOption && (<i className="fas fa-angle-down"></i>)}
                            { showOption && (<i className="fas fa-angle-up"></i>)}
                        </span>
                    </div>
                    
                    {
                        // options 
                        showOption && 
                        (<div className="estimasi-pendapatan__month-options">
                            { Object.keys(MONTHS).map(key => (
                                <div key={key} onClick={() => changeMonth(key)} className="estimasi-pendapatan__month-option">
                                    {MONTHS[key]}
                                </div>
                            ))}
                        </div>)
                    }
                </div>
            </div>
            <div className="estimari-pendapatan__chart">
                <ResponsiveContainer 
                     width={"100%"} 
                     height={400}
                   >
                       <LineChart 
                        data={reports}
                        margin={{ top: 15, right: 20, left: 20, bottom: 15 }}
                       >
                            <CartesianGrid stroke="#ccc" />
                            <Line type="monotone" dataKey="total" stroke="#FA591D"/>
                            <Tooltip content={CustomizeToolTipContent} />
                            <XAxis dataKey="label" />
                            <YAxis 
                            dataKey="total"
                            label={{ 
                                value : satuan, 
                                angle : -90,
                                position:"left"
                            }}/>
                       </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )

}

export default EstimasiPendapatan