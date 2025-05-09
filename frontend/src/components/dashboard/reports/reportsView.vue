<template>
    <div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 class="text-xl md:text-2xl font-bold text-zinc-900">Product Reports</h1>
            <button @click="openSubmitReportModal"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-black rounded-lg shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-300 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                </svg>
                Submit Report
            </button>
        </div>

        <div class="bg-white rounded-xl shadow-md border border-zinc-200 p-4 mb-6">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <label for="status-filter" class="block text-sm font-medium text-zinc-700 mb-2">Status</label>
                    <select id="status-filter" v-model="localFilters.status" @change="updateFilters"
                        class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="date-filter" class="block text-sm font-medium text-zinc-700 mb-2">Date Range</label>
                    <select id="date-filter" v-model="localFilters.dateRange" @change="updateFilters"
                        class="w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base">
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                    </select>
                </div>
                <div class="flex-1">
                    <label for="search" class="block text-sm font-medium text-zinc-700 mb-2">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-zinc-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input type="text" id="search" v-model="localFilters.search" @input="updateFiltersDebounced"
                            class="pl-10 w-full h-10 px-3 rounded-md border-zinc-300 shadow-sm focus:border-black focus:ring-black text-base"
                            placeholder="Search reports...">
                    </div>
                </div>
            </div>
        </div>

        <div class="block sm:hidden space-y-4">
            <ReportCard v-for="report in filteredReports" :key="report.id" :report="report"
                @click="openReportModal(report)" />

            <div v-if="filteredReports.length === 0" class="text-center py-8 text-zinc-500">
                No reports found matching your filters.
            </div>
        </div>

        <div
            class="hidden sm:block bg-white rounded-xl shadow-md border border-zinc-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-200">
                    <thead class="bg-zinc-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Product</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Reported By</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Issue Type</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Date</th>
                            <th class="px-4 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                Status</th>
                            <th class="relative px-4 py-3"><span class="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-zinc-100">
                        <tr v-for="report in filteredReports" :key="report.id"
                            class="hover:bg-zinc-50 transition-colors">
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div
                                        class="flex-shrink-0 h-10 w-10 bg-black text-white rounded-lg flex items-center justify-center">
                                        <span class="font-medium text-sm">
                                            {{ getProductInitials(report.product) }}
                                        </span>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-zinc-900">{{ report.product }}</div>
                                        <div class="text-xs text-zinc-500">#{{ report.productId }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-900">{{ report.reportedBy }}</div>
                                <div class="text-xs text-zinc-500">{{ report.email }}</div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-900">{{ report.issueType }}</div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <div class="text-sm text-zinc-900">{{ formatDate(report.date) }}</div>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap">
                                <span :class="[
                                    'px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full',
                                    getStatusClass(report.status)
                                ]">
                                    {{ report.status }}
                                </span>
                            </td>
                            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button @click="openReportModal(report)"
                                    class="text-black hover:text-zinc-700 transition-colors">
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="filteredReports.length === 0" class="text-center py-8 text-zinc-500">
                No reports found matching your filters.
            </div>
        </div>

        <ReportForm v-if="showSubmitModal" @close="showSubmitModal = false" @submit="handleSubmitReport" />

        <ReportModal v-if="showReportModal" :report="selectedReport" @close="showReportModal = false"
            @update-status="handleUpdateReportStatus" @add-comment="handleAddComment" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ReportCard from '@/components/dashboard/reports/report-card.vue';
import ReportModal from '@/components/dashboard/reports/report-modal.vue';
import ReportForm from '@/components/dashboard/reports/report-form.vue';

interface Report {
    id: string;
    product: string;
    productId: string;
    reportedBy: string;
    email: string;
    issueType: string;
    description: string;
    date: string;
    status: string;
    comments?: string[];
}

interface Filters {
    status: string;
    dateRange: string;
    search: string;
}

interface ReportFormData {
    product: string;
    productId: string;
    reportedBy: string;
    email: string;
    issueType: string;
    description: string;
}

const props = defineProps<{
    reports: Report[];
    filters: Filters;
}>();

const emit = defineEmits<{
    (e: 'update-filters', filters: Filters): void;
    (e: 'export-data'): void;
    (e: 'view-details', report: Report): void;
    (e: 'filter-metric', metric: any): void;
    (e: 'submit-report', reportData: ReportFormData): void;
    (e: 'update-report-status', reportId: string, status: string): void;
}>();

const localFilters = ref<Filters>({ ...props.filters });
const showSubmitModal = ref<boolean>(false);
const showReportModal = ref<boolean>(false);
const selectedReport = ref<Report>({
    id: '',
    product: '',
    productId: '',
    reportedBy: '',
    email: '',
    issueType: '',
    description: '',
    date: new Date().toISOString(), 
    status: '',
    comments: [] 
});

watch(() => props.filters, (newFilters) => {
    localFilters.value = { ...newFilters };
}, { deep: true });

const filteredReports = computed<Report[]>(() => {
    return props.reports.filter(report => {
        if (localFilters.value.status !== 'all' && report.status.toLowerCase() !== localFilters.value.status.toLowerCase()) {
            return false;
        }

        if (localFilters.value.dateRange !== 'all') {
            const now = new Date();
            const reportDate = new Date(report.date);

            if (localFilters.value.dateRange === 'today') {
                if (reportDate.toDateString() !== now.toDateString()) {
                    return false;
                }
            } else if (localFilters.value.dateRange === 'week') {
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                if (reportDate < weekStart) {
                    return false;
                }
            } else if (localFilters.value.dateRange === 'month') {
                if (reportDate.getMonth() !== now.getMonth() || reportDate.getFullYear() !== now.getFullYear()) {
                    return false;
                }
            } else if (localFilters.value.dateRange === 'quarter') {
                const currentQuarter = Math.floor(now.getMonth() / 3);
                const reportQuarter = Math.floor(reportDate.getMonth() / 3);
                if (reportQuarter !== currentQuarter || reportDate.getFullYear() !== now.getFullYear()) {
                    return false;
                }
            }
        }

        if (localFilters.value.search) {
            const searchTerm = localFilters.value.search.toLowerCase();
            return (
                report.product.toLowerCase().includes(searchTerm) ||
                report.reportedBy.toLowerCase().includes(searchTerm) ||
                report.issueType.toLowerCase().includes(searchTerm) ||
                report.description.toLowerCase().includes(searchTerm) ||
                report.productId.toLowerCase().includes(searchTerm)
            );
        }

        return true;
    });
});

const getProductInitials = (productName: string): string => {
    return productName
        .split(' ')
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join('');
};

const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

const getStatusClass = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'in progress':
            return 'bg-blue-100 text-blue-800';
        case 'resolved':
            return 'bg-black text-white';
        case 'rejected':
            return 'bg-zinc-200 text-zinc-800';
        default:
            return 'bg-zinc-200 text-zinc-800';
    }
};

let debounceTimeout: number;
const updateFiltersDebounced = (): void => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        updateFilters();
    }, 300);
};

const updateFilters = (): void => {
    emit('update-filters', { ...localFilters.value });
};

const openSubmitReportModal = (): void => {
    showSubmitModal.value = true;
};

const openReportModal = (report: Report): void => {
    selectedReport.value = report;
    showReportModal.value = true;
};

const handleSubmitReport = (reportData: ReportFormData): void => {
    emit('submit-report', reportData);
    showSubmitModal.value = false;
};

const handleUpdateReportStatus = (reportId: string, status: string): void => {
    emit('update-report-status', reportId, status);


    const reportIndex = props.reports.findIndex(r => r.id === reportId);
    if (reportIndex !== -1 && selectedReport.value) {
        selectedReport.value.status = status;
    }
};

const handleAddComment = (reportId: string, comment: string): void => {

    const reportIndex = props.reports.findIndex(r => r.id === reportId);
    if (reportIndex !== -1) {
        if (!props.reports[reportIndex].comments) {
            props.reports[reportIndex].comments = [];
        }
        props.reports[reportIndex].comments?.push(comment);
    }
};
</script>