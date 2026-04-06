import { useNavigate } from "react-router-dom";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useState } from "react";
import Toast from "../components/Toast/Toast";
import {
  TextInput,
  Title,
  Group,
  Fieldset,
  Stack,
  Button,
  Textarea,
  Card,
} from "@mantine/core";
import Error from "../components/Error";

export function OnBoarding() {
  const [toastMessage, setToastMessage] = useState("");
  const [authorData, setAuthorData] = useState({
    penName: "",
    bio: "",
    socialLinks: {
      website: "",
      x: "",
      instagram: "",
      linkedIn: "",
      facebook: "",
    },
  });

  const { submitForm, formErrors } = useSubmitForm("/authors", false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name starts with 'socialLinks-'
    if (name.includes("-")) {
      const [parent, child] = name.split("-");

      setAuthorData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setAuthorData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm(authorData);
    if (success) {
      navigate(`/author/my-books`, {
        state: { message: "Your author profile is pending admin approval" },
      });
    }
  };

  return (
    <article>
      <Card padding={"xl"}>
        <Title c={"copper.6"} fz={32} ta={"center"}>
          Become An Author
        </Title>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Stack justify="center" w={{ base: "100%", md: "80%", lg: "60%" }}>
              <TextInput
                label="Pen Name"
                name="penName"
                value={authorData.penName}
                onChange={handleChange}
                aria-invalid={formErrors.penName ? "true" : undefined}
                required
                error={formErrors.penName}
              />

              <Textarea
                label="Bio"
                name="bio"
                value={authorData.bio}
                onChange={handleChange}
                aria-invalid={formErrors.bio ? "true" : undefined}
                error={formErrors.bio}
                minRows={5}
              />

              <Fieldset legend="Social Links" mt={"md"}>
                <Stack>
                  <TextInput
                    name="socialLinks-website"
                    placeholder="Website"
                    value={authorData.socialLinks.website}
                    onChange={handleChange}
                    aria-invalid={
                      formErrors["socialLinks.website"] ? "true" : undefined
                    }
                    error={formErrors["socialLinks.website"]}
                  />

                  <TextInput
                    name="socialLinks-x"
                    placeholder="X (Twitter)"
                    value={authorData.socialLinks.x}
                    onChange={handleChange}
                    aria-invalid={
                      formErrors["socialLinks.x"] ? "true" : undefined
                    }
                    error={formErrors["socialLinks.x"]}
                  />

                  <TextInput
                    name="socialLinks-instagram"
                    placeholder="Instagram"
                    value={authorData.socialLinks.instagram}
                    onChange={handleChange}
                    aria-invalid={
                      formErrors["socialLinks.instagram"] ? "true" : undefined
                    }
                    error={formErrors["socialLinks.instagram"]}
                  />
                </Stack>
              </Fieldset>
            </Stack>

            {formErrors.general && <Error message={formErrors.general} />}

            <Button mt={"lg"} type="submit">
              Complete Onboarding
            </Button>
          </div>
        </form>
      </Card>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </article>
  );
}
