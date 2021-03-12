import React from 'react'
import { useTranslation } from 'react-i18next'

const HomePage = (props) => {
    // translation
    const { t, /*i18n*/ } = useTranslation()

    // rendering
    return (
        <div>
            {t("hello")}
        </div>
    )
}

export default HomePage
