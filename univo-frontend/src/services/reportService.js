import axios from 'axios';

// ======================================
// API BASE URL
// ======================================

const API =
    'http://localhost:5000/api/reports';

// ======================================
// AUTH HEADER
// ======================================

const getConfig = () => {

    const token =
        localStorage.getItem(
            'token'
        );

    return {

        headers: {

            Authorization:
                `Bearer ${token}`,
        },
    };
};

// ======================================
// GET ALL REPORTS
// ======================================

export const getReports =
    async () => {

        try {

            const response =
                await axios.get(
                    API,
                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'GET REPORTS ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// GET REPORT STATS
// ======================================

export const getReportStats =
    async () => {

        try {

            const response =
                await axios.get(
                    `${API}/stats`,
                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'GET REPORT STATS ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// RESOLVE REPORT
// ======================================

export const resolveReport =
    async (reportId) => {

        try {

            const response =
                await axios.patch(

                    `${API}/${reportId}/resolve`,

                    {},

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'RESOLVE REPORT ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// DISMISS REPORT
// ======================================

export const dismissReport =
    async (reportId) => {

        try {

            const response =
                await axios.patch(

                    `${API}/${reportId}/dismiss`,

                    {},

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'DISMISS REPORT ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// BAN USER FROM REPORT
// ======================================

export const banUserFromReport =
    async (reportId) => {

        try {

            const response =
                await axios.patch(

                    `${API}/${reportId}/ban`,

                    {},

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'BAN USER ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// CREATE REPORT
// ======================================

export const createReport =
    async (reportData) => {

        try {

            const response =
                await axios.post(

                    API,

                    reportData,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'CREATE REPORT ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// DELETE REPORT
// ======================================

export const deleteReport =
    async (reportId) => {

        try {

            const response =
                await axios.delete(

                    `${API}/${reportId}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'DELETE REPORT ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };