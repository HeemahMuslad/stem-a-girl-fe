import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { makeEnquiry } from "../../services/mutations";
import { useMutation } from "@tanstack/react-query";
import { PrimaryInput } from "../index";

const ContactUsComponent = () => {
  const schema = yup
    .object({
      fullName: yup.string().required("Please enter your name"),
      email: yup
        .string()
        .email("Please enter a valid email address.")
        .required("Please enter your email address."),
      description: yup.string().required("Please enter your message."),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const { mutate: handleContactUs } = useMutation({
    mutationFn: makeEnquiry,
    onSuccess: (data) => {
      toast.success("Message sent Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: (error, variables) => {
      toast.error("An error occurred.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
  const onsubmit = (data) => handleContactUs(data);

  const textareaRef = useRef();

  const handleTextAreaFocus = () => {
    textareaRef.current.classList.add("border-[rgb(233,152,203)]");
  };

  const handleTextAreaBlur = () => {
    textareaRef.current.classList.remove("border-[rgb(233,152,203)]");
  };
  return (
    <>
      <section className=" text-sealBrown font-mulish w-full -mt-8 bg-whiteSmoke">
        <div className=" bg-primaryPink pt-16 md:pt-24 lg:pt-28">
          <div className="w-[90%] max-w-[1280px] mx-auto min-h-[480px] flex flex-col justify-center 2md:justify-between 2md:flex-row md:items-center event-hero gap-8 py-12 2md:py-0 px-3 sm:px-0 star-bg">
            <div className="w-full max-w-[832px] mx-auto">
              <h1 className="hero-heading capitalize font-bold text-[32px] md:text-[36px] 2md:text-[40px] text-center leading-[150%] mx-auto text-white">
                contact us
              </h1>

              <p className="text-base md:text-lg mt-4 text-center text-white font-medium w-[85%] lg:w-full lg:max-w-[676px] mx-auto">
                Thank you for your interest in She Code Africa.
              </p>
              <p className="text-base md:text-lg text-center text-white font-medium w-[85%] lg:w-full lg:max-w-[676px] mx-auto">
                Reach out to us. Send an email to{" "}
                <a href="mailto:info@shecodeafrica.org" className="font-bold">
                  info@shecodeafrica.org
                </a>{" "}
                or fill the form below and send. If you would like to support
                our mission, please see our “partner with us” section.
              </p>
            </div>
          </div>
        </div>

        <section className="w-[90%] max-w-[900px] mx-auto mt-10 md:mt-12 pb-10">
          <form className="w-full" onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col md:flex-row gap-5 md:gap-20">
              <div className="w-full md:w-[50%]">
                <PrimaryInput
                  register={register}
                  label="name"
                  name="fullName"
                  placeholder="Enter your name"
                  type="text"
                  errors={errors.fullName}
                />
                <PrimaryInput
                  register={register}
                  label="email address"
                  name="email"
                  placeholder="Enter your email address"
                  type="email"
                  errors={errors.email}
                />
                <PrimaryInput
                  isRequired={false}
                  label="enter subject"
                  name="subject"
                  placeholder="What is the subject of this message"
                  type="text"
                />
              </div>

              <div className="w-full md:w-[50%]">
                <label
                  htmlFor="message"
                  className="text-base capitalize font-medium text-[rgba(46,52,79,1)]"
                >
                  enter message
                </label>
                <div
                  className={`w-full md:max-w-[549px] h-[290px] mt-2 rounded-md border border-gains overflow-hidden ${
                    errors.description?.message && "border-primaryPink"
                  }`}
                  ref={textareaRef}
                >
                  <textarea
                    {...register("description")}
                    name="description"
                    placeholder="Write your message"
                    className="text-base w-full h-full border-0 outline-none p-3 bg-white placeholder:text-[rgba(130,130,130,1)] resize-none"
                    onFocus={handleTextAreaFocus}
                    onBlur={handleTextAreaBlur}
                  ></textarea>
                </div>
                <p className="text-primaryPink text-sm">
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div className="flex md:justify-end w-full">
              <div className="mt-5 md:mt-8 w-full max-w-[177px] rounded-[30px] h-[56px] overflow-hidden bg-primaryPink">
                <button className="w-full h-full text-white capitalize">
                  send message
                </button>
              </div>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default ContactUsComponent;
