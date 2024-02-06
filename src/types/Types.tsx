export interface Event {
    id: string;
    eventName?: string;
    eventDescription?: string;
    eventDate?: string;
    unformatedEventDate?: Date;
    image?: string; // Assuming that the 'image' property is the require path for the image
  }
export type Props = {
    navigation:any,
    params:any,
    selectedItem?: Event
}
export interface AppErrorMessageProps {
  error?: string | undefined;
  visible?: boolean | undefined;
}
export interface AppFormFieldProps {
  name: string;
  placeholder?: string | undefined;
  clearButtonMode?: string | undefined;
  visible?: boolean | undefined;
}