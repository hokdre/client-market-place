import React from 'react'

const StatusOrder = props => {
    let { status = "" } = props

    return (
        <span className={`status-order status-order__${status}`}>
            {status}
        </span>
    )
}

export default StatusOrder