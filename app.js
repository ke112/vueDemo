// Vue.js 应用程序 - 为Flutter开发者学习HTML/Web开发
const { createApp } = Vue;

createApp({
    // 数据状态 (类似Flutter中的State)
    data() {
        return {
            // 标签页管理
            activeTab: 'list',
            tabs: [
                {
                    id: 'list',
                    name: '列表循环',
                    title: '📝 示例1: 列表循环展示 (类似Flutter ListView)'
                },
                {
                    id: 'state',
                    name: '状态管理',
                    title: '🔄 示例2: 状态管理 (类似Flutter State管理)'
                },
                {
                    id: 'interactive',
                    name: '交互操作',
                    title: '⚡ 示例3: 交互式操作 (CRUD操作)'
                },
                {
                    id: 'styling',
                    name: '动态样式',
                    title: '🎨 示例4: 动态样式和条件渲染'
                }
            ],

            // 示例1: 用户列表数据
            users: [
                {
                    id: 1,
                    name: '张三',
                    email: 'zhangsan@example.com',
                    avatar: 'https://ui-avatars.com/api/?name=张三&background=random',
                    isActive: true
                },
                {
                    id: 2,
                    name: '李四',
                    email: 'lisi@example.com',
                    avatar: 'https://ui-avatars.com/api/?name=李四&background=random',
                    isActive: false
                },
                {
                    id: 3,
                    name: '王五',
                    email: 'wangwu@example.com',
                    avatar: 'https://ui-avatars.com/api/?name=王五&background=random',
                    isActive: true
                },
                {
                    id: 4,
                    name: '赵六',
                    email: 'zhaoliu@example.com',
                    avatar: 'https://ui-avatars.com/api/?name=赵六&background=random',
                    isActive: false
                }
            ],

            // 示例2: 状态管理
            counter: 0,
            formData: {
                name: '',
                email: '',
                role: ''
            },

            // 示例3: 待办事项
            todos: [
                { id: 1, text: '学习Vue.js基础', completed: true },
                { id: 2, text: '理解组件概念', completed: false },
                { id: 3, text: '掌握状态管理', completed: false }
            ],
            newTodo: '',
            currentFilter: '全部',
            filters: ['全部', '待完成', '已完成'],

            // 示例4: 动态样式
            currentTheme: 'light',
            themes: [
                { name: 'light', label: '浅色' },
                { name: 'dark', label: '深色' },
                { name: 'colorful', label: '彩色' }
            ],
            progress: 0,
            showMessage: false,
            isLoading: false,
            hasError: false
        };
    },

    // 计算属性 (类似Flutter中的getter)
    computed: {
        // 计数器状态描述
        counterStatus() {
            if (this.counter === 0) return '初始状态';
            if (this.counter > 0 && this.counter <= 5) return '较小值';
            if (this.counter > 5 && this.counter <= 10) return '中等值';
            return '较大值';
        },

        // 表单完整性计算
        formCompleteness() {
            const fields = Object.values(this.formData);
            const filledFields = fields.filter(field => field.trim() !== '').length;
            return Math.round((filledFields / fields.length) * 100);
        },

        // 过滤后的待办事项
        filteredTodos() {
            switch (this.currentFilter) {
                case '待完成':
                    return this.todos.filter(todo => !todo.completed);
                case '已完成':
                    return this.todos.filter(todo => todo.completed);
                default:
                    return this.todos;
            }
        },

        // 待办事项统计
        completedCount() {
            return this.todos.filter(todo => todo.completed).length;
        },

        pendingCount() {
            return this.todos.filter(todo => !todo.completed).length;
        }
    },

    // 方法 (类似Flutter中的methods)
    methods: {
        // 示例1: 用户状态切换
        toggleUserStatus(user) {
            user.isActive = !user.isActive;
            console.log(`用户 ${user.name} 状态已更改为: ${user.isActive ? '在线' : '离线'}`);
        },

        // 示例2: 计数器操作
        increment() {
            this.counter++;
        },

        decrement() {
            if (this.counter > 0) {
                this.counter--;
            }
        },

        reset() {
            this.counter = 0;
            console.log('计数器已重置');
        },

        // 示例3: 待办事项操作
        addTodo() {
            if (this.newTodo.trim()) {
                const newId = Math.max(...this.todos.map(t => t.id), 0) + 1;
                this.todos.push({
                    id: newId,
                    text: this.newTodo.trim(),
                    completed: false
                });
                this.newTodo = '';
                console.log('新任务已添加');
            }
        },

        removeTodo(todoId) {
            const index = this.todos.findIndex(todo => todo.id === todoId);
            if (index > -1) {
                const removedTodo = this.todos.splice(index, 1)[0];
                console.log(`任务 "${removedTodo.text}" 已删除`);
            }
        },

        updateTodoStats() {
            // 这个方法在复选框状态改变时触发，用于演示事件处理
            console.log(`待办事项统计更新: ${this.completedCount} 已完成, ${this.pendingCount} 待完成`);
        },

        // 示例4: 动画演示
        animateProgress() {
            this.progress = 0;
            const interval = setInterval(() => {
                this.progress += 10;
                if (this.progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        this.progress = 0;
                    }, 1000);
                }
            }, 100);
        }
    },

    // 生命周期钩子 (类似Flutter中的lifecycle)
    mounted() {
        console.log('Vue应用已挂载');
        console.log('这类似Flutter中的initState()方法');

        // 演示异步数据加载
        setTimeout(() => {
            console.log('模拟异步数据加载完成');
        }, 1000);
    },

    // 观察器 (类似Flutter中的listener)
    watch: {
        // 监听计数器变化
        counter(newValue, oldValue) {
            console.log(`计数器从 ${oldValue} 变为 ${newValue}`);
        },

        // 监听表单数据变化
        formData: {
            handler(newData) {
                console.log('表单数据已更新:', newData);
            },
            deep: true // 深度监听对象属性变化
        },

        // 监听主题变化
        currentTheme(newTheme) {
            console.log(`主题已切换为: ${newTheme}`);
            document.body.className = `theme-${newTheme}`;
        }
    }
}).mount('#app'); 