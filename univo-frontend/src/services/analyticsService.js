import axios from 'axios';

// ======================================
// API BASE URL
// ======================================

const API =
    'http://localhost:5000/api/analytics';

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
// GET OVERVIEW ANALYTICS
// ======================================

export const getOverviewAnalytics =
    async (
        timeFilter = '7days'
    ) => {

        try {

            const response =
                await axios.get(

                    `${API}/overview?filter=${timeFilter}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'OVERVIEW ANALYTICS ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// GET USER GROWTH DATA
// ======================================

export const getUserGrowthAnalytics =
    async (
        timeFilter = '7days'
    ) => {

        try {

            const response =
                await axios.get(

                    `${API}/user-growth?filter=${timeFilter}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'USER GROWTH ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// GET DEPARTMENT ENGAGEMENT
// ======================================

export const getDepartmentAnalytics =
    async (
        timeFilter = '7days'
    ) => {

        try {

            const response =
                await axios.get(

                    `${API}/department-engagement?filter=${timeFilter}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'DEPARTMENT ANALYTICS ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// GET CONTENT DISTRIBUTION
// ======================================

export const getContentDistributionAnalytics =
    async (
        timeFilter = '7days'
    ) => {

        try {

            const response =
                await axios.get(

                    `${API}/content-distribution?filter=${timeFilter}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'CONTENT DISTRIBUTION ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// GET PEAK ACTIVITY DATA
// ======================================

export const getPeakActivityAnalytics =
    async (
        timeFilter = '7days'
    ) => {

        try {

            const response =
                await axios.get(

                    `${API}/peak-activity?filter=${timeFilter}`,

                    getConfig()
                );

            return response.data;

        } catch (error) {

            console.error(
                'PEAK ACTIVITY ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };

// ======================================
// EXPORT ANALYTICS REPORT
// ======================================

export const exportAnalyticsReport =
    async (
        timeFilter = '7days'
    ) => {

        try {

            const response =
                await axios.get(

                    `${API}/export?filter=${timeFilter}`,

                    {

                        ...getConfig(),

                        responseType:
                            'blob',
                    }
                );

            return response.data;

        } catch (error) {

            console.error(
                'EXPORT REPORT ERROR:',
                error
            );

            throw (
                error?.response?.data ||
                error
            );
        }
    };