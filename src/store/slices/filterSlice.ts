import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FilterState = {
  categories: string[]
  impactTypes: string[]
  certifications: string[]
  sortBy: string
}

const initialState: FilterState = {
  categories: [],
  impactTypes: [],
  certifications: [],
  sortBy: 'impact-desc',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleCategory(state, action: PayloadAction<string>) {
      const index = state.categories.indexOf(action.payload)
      index >= 0 ? state.categories.splice(index, 1) : state.categories.push(action.payload)
    },
    toggleImpactType(state, action: PayloadAction<string>) {
      const index = state.impactTypes.indexOf(action.payload)
      index >= 0 ? state.impactTypes.splice(index, 1) : state.impactTypes.push(action.payload)
    },
    toggleCertification(state, action: PayloadAction<string>) {
      const index = state.certifications.indexOf(action.payload)
      index >= 0 ? state.certifications.splice(index, 1) : state.certifications.push(action.payload)
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
    },
    resetFilters() {
      return initialState
    },
  },
})

export const {
  toggleCategory,
  toggleImpactType,
  toggleCertification,
  setSortBy,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
