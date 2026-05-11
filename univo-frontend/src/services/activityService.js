import axios from 'axios';

// ======================================
// API BASE URL
// ======================================

const API =
    'http://localhost:5000/api/activity';

// ======================================
// AUTH CONFIG
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
// GET ALL ACTIVITY LOGS
// ======================================

export const getActivityLogs =
    async ({

        page = 1,

        limit = 10,

        search = '',

        type = '',

        date = '',

    } = {}) => {

        try {

            const response =
                await axios.get(

                    `${API}/logs`,

                    {

                        ...getConfig(),

                        params: {

                            page,

                            limit,

                            search,

                            type,

                            date,
                        },
                    }
                );

            return response.data;

        } catch (error) {

            console.error(
                'GET ACTIVITY LOGS ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// GET SINGLE ACTIVITY LOG
// ======================================

export const getActivityById =
    async (id) => {

        try {

            const response =
                await axios.get(

                    `${API}/logs/${id}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'GET ACTIVITY ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// CREATE ACTIVITY LOG
// ======================================

export const createActivityLog =
    async (data) => {

        try {

            const response =
                await axios.post(

                    `${API}/logs`,

                    data,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'CREATE ACTIVITY ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// DELETE ACTIVITY LOG
// ======================================

export const deleteActivityLog =
    async (id) => {

        try {

            const response =
                await axios.delete(

                    `${API}/logs/${id}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'DELETE ACTIVITY ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// CLEAR ALL ACTIVITY LOGS
// ======================================

export const clearAllActivityLogs =
    async () => {

        try {

            const response =
                await axios.delete(

                    `${API}/logs`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'CLEAR ACTIVITY LOGS ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };