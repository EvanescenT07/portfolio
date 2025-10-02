import { ContactProps } from "@/types/data-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const PersonalInfo: ContactProps[] = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    value: "(+62) 857 8275 2584",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    value: "za.aliansyah@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    value: "Depok, West Java, Indonesia",
  },
  {
    icon: <FaLinkedinIn />,
    title: "LinkedIn",
    value: "Zulfikar Ahmad Aliansyah",
  },
];

const initFormData = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export const ContactMe = () => {
  const [formData, setFormData] = useState(initFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;
    if (userID) {
      emailjs.init(userID);
    }
  }, []);

  const HandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

      if (!serviceID || !templateID || !userID) {
        throw new Error("EmailJS environment variables are not set.");
      }

      await emailjs.send(
        serviceID,
        templateID,
        {
          from_name: `${formData.firstname} ${formData.lastname}`,
          time: new Date().toLocaleString(),
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        userID
      );
      toast.success("Message sent successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    } catch {
      toast.error("Failed to send message.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-comfortaa text-foreground mb-4">
          Get in Touch
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-ring mx-auto rounded-full" />
        <p className="text-lg text-foreground/70 mt-6 font-work-sans max-w-2xl mx-auto">
          Feel free to reach out for collaborations or just a friendly hello!
        </p>
      </div>

      {/* Contact */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left - Form Email */}
          <div className="flex-1 md:w-1/2 order-2 md:order-none">
            <form
              className="flex flex-col gap-8 p-12 bg-primary/5 rounded-2xl border border-primary/10 shadow-lg active:shadow-xl transition-all"
              onSubmit={HandleSubmit}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-comfortaa text-foreground text-center">
                  Let&apos;s Connect
                </h3>
                <p className="text-lg text-foreground/70 mt-6 font-work-sans text-center">
                  I&apos;d love to hear from you! Whether you have a question,
                  want to collaborate, or just want to say hello, feel free to
                  reach out using the form below.
                </p>
              </div>

              {/* User Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="text-sm font-work-sans">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    value={formData.firstname}
                    onChange={HandleChange}
                    aria-label="First Name"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-sm font-work-sans">
                    Last Name
                  </Label>
                  <Input
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    value={formData.lastname}
                    onChange={HandleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-work-sans">
                    Email
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    value={formData.email}
                    onChange={HandleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-work-sans">
                    Phone
                  </Label>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={HandleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="subject" className="text-sm font-work-sans">
                    Subject
                  </Label>
                  <Input
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={HandleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="message" className="text-sm font-work-sans">
                    Message
                  </Label>
                  <Textarea
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={HandleChange}
                    className="w-full h-32 resize-none"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Personal Information */}
          <div className="flex flex-1 items-start md:items-center md:justify-center order-1 md:order-none">
            <ul className="flex flex-col gap-8 w-full max-w-md">
              {PersonalInfo.map((data) => (
                <li key={data.title} className="flex items-center gap-8 group">
                  <div className="w-24 h-24 bg-primary/5 group-hover:bg-primary/30 rounded-2xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-500">
                    <div className="text-3xl text-foreground">{data.icon}</div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-xl text-foreground font-semibold text-work-sans">
                      {data.title}
                    </p>
                    <p className="text-lg text-foreground font-reguler text-work-sans">
                      {data.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
