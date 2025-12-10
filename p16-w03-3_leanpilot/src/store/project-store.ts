import { create } from "zustand";

interface ProjectState {
	projectId: string | null;
	stageData: Record<number, Record<string, any>>; // { stageNumber: { questionId: answer } }
	setProjectId: (id: string) => void;
	setStageData: (stageNumber: number, data: Record<string, any>) => void;
	getStageData: (stageNumber: number) => Record<string, any> | undefined;
	reset: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
	projectId: null,
	stageData: {},
	setProjectId: (id) => set({ projectId: id }),
	setStageData: (stageNumber, data) =>
		set((state) => ({
			stageData: {
				...state.stageData,
				[stageNumber]: data,
			},
		})),
	getStageData: (stageNumber) => get().stageData[stageNumber],
	reset: () => set({ projectId: null, stageData: {} }),
}));
