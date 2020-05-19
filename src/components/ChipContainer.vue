<template>
    <div>
        <p v-show="show" class="text-left">{{ title }}</p>

        <v-combobox
            class="mb-5"
            v-show="show"
            v-model="model"
            chips
            append-icon
            clearable
            multiple
            solo
            flat
            outlined
            dense
            background-color="transparent"
            height="80"
        >
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                    color="gray"
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click:close="remove(item)"
                >
                    {{ item }}
                </v-chip>
            </template>
        </v-combobox>
    </div>
</template>
<script>
export default {
	props: {
		show: {
			type: Boolean,
			required: true
		},
		value: {
            type: Array,
            required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	data: () => ({
		
    }),
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
	watch: {
        model(val) {
            this.$emit('input', val);
        },
    },
    methods: {
        remove(item) {
            this.model.splice(this.model.indexOf(item), 1)
            this.model = [...this.model]
        },
    }
}
</script>
