import type { modalFormType } from '../interfaces/ModalFormInterface'

export default class ModalForm implements modalFormType {
  name: string
  year: string
  companyContent: string
  companyLearnings: string
  schoolContent: string
  isDone: boolean
  date: { start: string; end: string }

  constructor({}: modalFormType) {
    this.name = ''
    this.year = ''
    this.companyContent = ''
    this.companyLearnings = ''
    this.schoolContent = ''
    this.isDone = false
    this.date = { start: '', end: '' }
  }

  static getNew() {
    return new this({
      name: '',
      year: '',
      companyContent: '',
      companyLearnings: '',
      schoolContent: '',
      isDone: false,
      date: { start: '', end: '' }
    } as modalFormType)
  }

  isValid() {
    if (
      this.name && typeof this.name === 'string' && this.name.trim() !== '' &&
      this.year && typeof this.year === 'number' &&
      this.companyContent && typeof this.companyContent === 'string' && this.companyContent.trim() !== '' &&
      this.companyLearnings && typeof this.companyLearnings === 'string' && this.companyLearnings.trim() !== '' &&
      this.schoolContent && typeof this.schoolContent === 'string' && this.schoolContent.trim() !== '' &&
      this.date && 
      this.date.start && typeof this.date.start === 'string' && this.date.start.trim() !== '' &&
      this.date.end && typeof this.date.end === 'string' && this.date.end.trim() !== ''
    ) {
      return true;
    }
    console.log(this);
    
    return false;
  }
  

  // Static method to create a new ModalForm from an object
  static fromObject(obj: modalFormType): ModalForm {
    if (!obj) {
      console.error("Das übergebene Objekt ist null oder undefined.");
      return this.getNew(); // Rückgabe eines leeren Objekts
    }
    console.log("Objekt empfangen:", obj);
    console.log("Name:", obj.name);
    
    return new this({
      name: obj.name || '',
      year: obj.year || '',
      companyContent: obj.companyContent || '',
      companyLearnings: obj.companyLearnings || '',
      schoolContent: obj.schoolContent || '',
      isDone: obj.isDone || false,
      date: {
        start: obj.date?.start || '',
        end: obj.date?.end || ''
      }
    } as modalFormType);
  }
  

  // Static method to create a new ModalForm from an array
  static fromArray(arr: Array<string | boolean>): ModalForm {
    return new this({
      name: (arr[0] as string) || '',
      year: (arr[1] as string) || '',
      companyContent: (arr[2] as string) || '',
      companyLearnings: (arr[3] as string) || '',
      schoolContent: (arr[4] as string) || '',
      isDone: (arr[5] as boolean) || false,
      date: {
        start: (arr[6] as string) || '',
        end: (arr[7] as string) || ''
      }
    })
  }
}
