import React from 'react';
import LayoutMerchant, { LayoutMerchantContent } from '../../layout/merchant/layout_merchant'
import { MenuMerchantForCustomer } from './menubar_fitur_merchant';
import EstimasiPendapatan from '../../features/order/estimasi_pendapatan';
import MonthSummary from '../../features/order/month_summary';
import Section from '../../components/UI_components/section';
import { H2 } from '../../components/UI_components/heading';
import Navbar from '../../layout/navbar';

const MerchantHomePage = props => {
    return (
        <>
        <Navbar/>
        <LayoutMerchant>
            <LayoutMerchantContent>
                <Section>
                    <H2>Pesanan Anda Saat Ini</H2>
                    <MonthSummary/>
                </Section>
                <Section>
                    <H2>Estimasi Omset Anda :</H2>
                    <EstimasiPendapatan/>
                </Section>
            </LayoutMerchantContent>
        </LayoutMerchant>
        </>
    )
}

export default MerchantHomePage;