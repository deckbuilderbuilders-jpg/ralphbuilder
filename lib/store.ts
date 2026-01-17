import { create } from 'zustand';

export type Step = 'description' | 'clarification' | 'prd' | 'cost' | 'payment' | 'building' | 'complete';

export interface AppBuilderState {
  // Current step
  currentStep: Step;
  setCurrentStep: (step: Step) => void;

  // User input
  appDescription: string;
  setAppDescription: (description: string) => void;

  // Clarifying questions
  questions: string[];
  setQuestions: (questions: string[]) => void;
  answers: Record<string, string>;
  setAnswer: (question: string, answer: string) => void;

  // PRD
  prd: string;
  setPrd: (prd: string) => void;

  // Cost estimation
  estimatedTokens: number;
  estimatedCost: number;
  setEstimate: (tokens: number, cost: number) => void;
  costApproved: boolean;
  approveCost: () => void;

  // Payment
  paymentId: string;
  setPaymentId: (id: string) => void;

  // Building
  buildProgress: number;
  buildLog: string[];
  setBuildProgress: (progress: number) => void;
  addBuildLog: (message: string) => void;
  clearBuildLog: () => void;

  // Result
  builtAppUrl: string;
  setBuiltAppUrl: (url: string) => void;
  builtAppCode: string;
  setBuiltAppCode: (code: string) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  currentStep: 'description' as Step,
  appDescription: '',
  questions: [],
  answers: {} as Record<string, string>,
  prd: '',
  estimatedTokens: 0,
  estimatedCost: 0,
  costApproved: false,
  paymentId: '',
  buildProgress: 0,
  buildLog: [] as string[],
  builtAppUrl: '',
  builtAppCode: '',
};

export const useAppBuilder = create<AppBuilderState>((set) => ({
  ...initialState,

  setCurrentStep: (step: Step) => set({ currentStep: step }),
  setAppDescription: (appDescription: string) => set({ appDescription }),

  setQuestions: (questions: string[]) => set({ questions }),
  setAnswer: (question: string, answer: string) =>
    set((state) => ({
      answers: { ...state.answers, [question]: answer },
    })),

  setPrd: (prd: string) => set({ prd }),

  setEstimate: (estimatedTokens: number, estimatedCost: number) =>
    set({ estimatedTokens, estimatedCost }),
  approveCost: () => set({ costApproved: true }),

  setPaymentId: (paymentId: string) => set({ paymentId }),

  setBuildProgress: (buildProgress: number) => set({ buildProgress }),
  addBuildLog: (message: string) =>
    set((state) => ({
      buildLog: [...state.buildLog, `[${new Date().toLocaleTimeString()}] ${message}`],
    })),
  clearBuildLog: () => set({ buildLog: [] }),

  setBuiltAppUrl: (builtAppUrl: string) => set({ builtAppUrl }),
  setBuiltAppCode: (builtAppCode: string) => set({ builtAppCode }),

  reset: () => set(initialState),
}));
