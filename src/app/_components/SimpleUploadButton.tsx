"use client";

import { LoaderCircle, CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { toast } from "sonner";
import { useUploadThing } from "~/lib/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export function SimpleUploadButton() {
  const router = useRouter();

  const posthog = usePostHog();

  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onUploadBegin() {
      posthog.capture("Upload attempt started");
      toast(
        <div className="flex items-center gap-2 text-white">
          <LoaderCircle className="animate-spin" />
          <span className="text-lg">Uploading...</span>
        </div>,
        {
          duration: 30000,
          id: "upload-begin",
        },
      );
    },
    onUploadError(error) {
      posthog.capture("Upload failed", {
        error,
      });
      toast.dismiss("upload-begin");
      toast.error("Upload failed");
    },
    onClientUploadComplete() {
      toast.dismiss("upload-begin");
      toast.success(
        <span className="text-lg text-white">Upload Complete!</span>,
      );

      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="upload-button" className="cursor-pointer">
        <CloudUpload />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
    </div>
  );
}
