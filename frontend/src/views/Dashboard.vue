<template>
    <div class="min-h-screen bg-white">
        <div class="flex h-screen overflow-hidden">
            <AppSidebar :sidebarOpen="sidebarOpen" :activeTab="activeTab" @toggle-sidebar="toggleSidebar"
                @set-active-tab="setActiveTab" />

            <div class="flex-1 md:ml-64">
                <MobileHeader :pageTitle="getPageTitle" @toggle-sidebar="toggleSidebar" />


                <div v-if="isLoading"
                    class="absolute inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
                    <div class="flex flex-col items-center">
                        <svg class="animate-spin h-10 w-10 text-emerald-600 mb-4" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                        <p class="text-emerald-800 font-medium">Loading data...</p>
                    </div>
                </div>

                <main class="p-4 md:p-6 overflow-y-auto" style="height: calc(100vh - 64px)">
                    <div class="max-w-7xl mx-auto">
                        <!-- Error message -->
                        <div v-if="error"
                            class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p class="text-sm">{{ error }}</p>
                                </div>
                                <div class="ml-auto pl-3">
                                    <div class="-mx-1.5 -my-1.5">
                                        <button @click="error = ''"
                                            class="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <span class="sr-only">Dismiss</span>
                                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path fill-rule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DashboardView v-if="activeTab === 'dashboard' && !isLoading"
                            :productInventory="productInventory" :users="users" :inStockCount="inStockCount"
                            :lowStockCount="lowStockCount" :outOfStockCount="outOfStockCount"
                            :activeUserCount="activeUserCount" :inactiveUserCount="inactiveUserCount"
                            :totalInventoryValue="totalInventoryValue" :averageProductPrice="averageProductPrice"
                            :mostExpensivePrice="mostExpensivePrice" :recentProducts="recentProducts"
                            :recentUsers="recentUsers" @set-active-tab="setActiveTab" />

                        <ProductsView v-if="activeTab === 'products' && !isLoading" :productInventory="productInventory"
                            @open-add-item-modal="openAddItemModal" @edit-item="editItem"
                            @confirm-delete-product="confirmDeleteProduct" />

                        <UsersView v-if="activeTab === 'users' && !isLoading" :users="users"
                            @open-add-item-modal="openAddItemModal" @edit-user="editUser"
                            @confirm-delete-user="confirmDeleteUser" />
                    </div>
                </main>
            </div>
        </div>

        <AddEditModal :show="showAddItemModal" :activeTab="activeTab" :isEditing="isEditing"
            :productFormData="productFormData" :userFormData="userFormData" :isSubmitting="isSubmitting"
            @close="showAddItemModal = false" @submit-form="submitFormProduct" @submit-user-form="submitUserForm"
            :getModalTitle="getModalTitle" />

        <DeleteConfirmationModal :show="showDeleteModal" :deleteItemType="deleteItemType" :isDeleting="isDeleting"
            @close="showDeleteModal = false" @delete-item="deleteItem" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import AppSidebar from '@/components/dashboard/AppSidebar.vue';
import MobileHeader from '@/components/dashboard/MobileHeader.vue';
import DashboardView from '@/components/dashboard/DashboardView.vue';
import ProductsView from '@/components/dashboard/ProductsView.vue';
import UsersView from '@/components/dashboard/UsersView.vue';
import AddEditModal from '@/components/dashboard/AddEditModal.vue';
import DeleteConfirmationModal from '@/components/dashboard/DeleteConfirmationModal.vue';

// Pinia
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const {
    users,
    products: productInventory,
    error,
    isLoading
} = storeToRefs(userStore);

const isSubmitting = ref<boolean>(false);
const isDeleting = ref<boolean>(false);

interface Tab {
    id: string;
    name: string;
}

type ProductItem = {
    id: number;
    name: string;
    category: string;
    sku: string;
    price: number;
    stock: number;
    status?: string;
};


interface productFormData {
    id: any;
    name: string;
    sku: string;
    category: string;
    stock: number;
    price: number;
}

interface User {
    id?: any;
    name?: string;
    email?: string;
    role?: string;
    status?: string;
    password?: string;
}

interface UserFormData {
    id?: any;
    name: string;
    email: string;
    role: string;
    status: string;
    password: string;
}

const sidebarOpen = ref<boolean>(false);
const showAddItemModal = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);
const activeTab = ref<string>('dashboard');
const isEditing = ref<boolean>(false);
const editingItemIndex = ref<number>(-1);
const userToDelete = ref<User | null>(null);
const productToDelete = ref<ProductItem | null>(null);
const deleteItemType = ref<string>('item');

const productFormData = reactive<productFormData>({
    id: '',
    name: '',
    sku: '',
    category: 'Lubricants',
    stock: 0,
    price: 0
});

const userFormData = reactive<UserFormData>({
    id: '',
    name: '',
    email: '',
    role: 'Employee',
    status: 'Active',
    password: ''
});

const loading = ref(false);

onMounted(async () => {
    loading.value = true;
    try {
        await Promise.all([
            userStore.fetchUsers(),
            userStore.fetchProducts()
        ]);
    } catch (err) {
    } finally {
        loading.value = false;
    }
});

const isSubmitDisabled = computed<boolean>(() => {
    if (activeTab.value === 'products') {
        return !productFormData.name || !productFormData.sku || productFormData.stock < 0 || productFormData.price <= 0;
    } else if (activeTab.value === 'users') {
        return !userFormData.name || !userFormData.email || (!isEditing.value && !userFormData.password);
    }
    return false;
});

const toggleSidebar = (): void => {
    sidebarOpen.value = !sidebarOpen.value;
};

const setActiveTab = (tab: string): void => {
    activeTab.value = tab;
    if (window.innerWidth < 768) {
        sidebarOpen.value = false;
    }
};

const getPageTitle = computed((): string => {
    switch (activeTab.value) {
        case 'dashboard':
            return 'Dashboard';
        case 'products':
            return 'Products';
        case 'users':
            return 'Users';
        default:
            return 'Inventory';
    }
});

const tabs: Tab[] = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'products', name: 'Products' },
    { id: 'users', name: 'Users' }
];

const inStockCount = computed((): number => {
    return productInventory.value.filter(item => item.stock > 20).length;
});

const lowStockCount = computed((): number => {
    return productInventory.value.filter(item => item.stock > 0 && item.stock <= 20).length;
});

const outOfStockCount = computed((): number => {
    return productInventory.value.filter(item => item.stock === 0).length;
});

const activeUserCount = computed((): number => {
    return users.value.filter(user => user.status.toLocaleLowerCase() === 'active').length;
});

const inactiveUserCount = computed((): number => {
    return users.value.filter(user => user.status.toLocaleLowerCase() === 'inactive').length;
});

const totalInventoryValue = computed((): number => {
    return productInventory.value.reduce((total, item) => total + (item.price * item.stock), 0);
});

const averageProductPrice = computed((): number => {
    if (productInventory.value.length === 0) return 0;
    return productInventory.value.reduce((total, item) => total + item.price, 0) / productInventory.value.length;
});

const mostExpensivePrice = computed((): number => {
    if (productInventory.value.length === 0) return 0;
    return Math.max(...productInventory.value.map(item => item.price));
});

const recentProducts = computed((): ProductItem[] => {
    return [...productInventory.value].slice(0, 3);
});

const recentUsers = computed((): User[] => {
    return [...users.value].slice(0, 3);
});

const resetFormData = (): void => {
    Object.assign(productFormData, {
        type: 'product',
        name: '',
        sku: '',
        category: 'Lubricants',
        stock: 0,
        price: 0
    });
};

const resetUserFormData = (): void => {
    Object.assign(userFormData, {
        name: '',
        email: '',
        role: 'Employee',
        status: 'Active',
        password: ''
    });
};

const openAddItemModal = (): void => {
    isEditing.value = false;
    editingItemIndex.value = -1;

    if (activeTab.value === 'users') {
        resetUserFormData();
    } else {
        resetFormData();
    }

    showAddItemModal.value = true;
};

const getModalTitle = (): string => {
    if (activeTab.value === 'users') {
        return isEditing.value ? 'Edit User' : 'Add New User';
    } else {
        return isEditing.value ? 'Edit Item' : 'Add New Item';
    }
};


const editItem = (item: ProductItem, id: any): void => {
    isEditing.value = true;

    editingItemIndex.value = productInventory.value.findIndex(product =>
        product.name === item.name && product.sku === item.sku
    );

    Object.assign(productFormData, {
        id: id,
        name: item.name,
        sku: item.sku,
        category: item.category,
        stock: item.stock,
        price: item.price,
    });

    showAddItemModal.value = true;
};

const editUser = (user: User, id: any): void => {
    isEditing.value = true;

    editingItemIndex.value = users.value.findIndex(u =>
        u.email === user.email
    );

    Object.assign(userFormData, {
        id: id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        password: user.password
    });

    showAddItemModal.value = true;
};

const confirmDeleteUser = (user: User): void => {
    userToDelete.value = user;
    productToDelete.value = null;
    deleteItemType.value = 'user';
    showDeleteModal.value = true;
};

const confirmDeleteProduct = (product: ProductItem): void => {
    productToDelete.value = product;
    userToDelete.value = null;
    deleteItemType.value = 'product';
    showDeleteModal.value = true;
};

const deleteItem = async (): Promise<void> => {
    isDeleting.value = true;

    try {
        if (userToDelete.value) {
            console.log(userToDelete.value)
            await userStore.deleteUser(userToDelete.value.id);
            userToDelete.value = null;
        } else if (productToDelete.value) {
            await userStore.deleteProduct(productToDelete.value.id);
            productToDelete.value = null;
        }
    } catch (err) {
        console.error('Error deleting item:', err);
        error.value = 'Failed to delete item. Please try again.';
    } finally {
        isDeleting.value = false;
        showDeleteModal.value = false;
    }
};


const submitFormProduct = async (): Promise<void> => {
    if (isSubmitDisabled.value) return;

    isSubmitting.value = true;

    try {


        const productItem: ProductItem = {
            id: productFormData.id,
            name: productFormData.name,
            sku: productFormData.sku,
            category: productFormData.category,
            stock: productFormData.stock,
            price: productFormData.price,
        };

        if (isEditing.value && editingItemIndex.value >= 0) {
            await userStore.updateProduct(productItem);
        } else {
            await userStore.createProduct(productItem);
        }

        resetFormData();
    } catch (err) {
        console.error('Error submitting product:', err);
        error.value = 'Failed to save product. Please try again.';
    } finally {
        isSubmitting.value = false;
        showAddItemModal.value = false;
    }
};

const submitUserForm = async (): Promise<void> => {
    if (isSubmitDisabled.value) return;

    isSubmitting.value = true;

    try {


        const user: User = {
            id: userFormData.id,
            name: userFormData.name,
            email: userFormData.email,
            role: userFormData.role.toLowerCase(),
            status: userFormData.status.toLowerCase(),
            password: userFormData.password,
        }

        if (isEditing.value && editingItemIndex.value >= 0) {
            await userStore.updateUser(user);
        } else {
            await userStore.createUser(user);
        }

        resetUserFormData();
    } catch (err) {
        console.error('Error submitting user:', err);
        error.value = 'Failed to save user. Please try again.';
    } finally {
        isSubmitting.value = false;
        showAddItemModal.value = false;
    }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>