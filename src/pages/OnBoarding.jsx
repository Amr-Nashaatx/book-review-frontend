import { useNavigate } from "react-router-dom";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useState } from "react";
import ErrorMsg from "../components/ErrorMsg";
import Toast from "../components/Toast/Toast";

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

  const { submitForm, formErrors } = useSubmitForm(
    ["penName", "bio", "socialLinks"],
    "/authors",
    false,
  );

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
      navigate(`/author/dashboard`, {
        state: { message: "Your author profile is pending admin approval" },
      });
    }
  };

  return (
    <article>
      <header style={{ padding: "2rem 5rem" }}>
        <h2>Become An Author</h2>
      </header>

      <form onSubmit={handleSubmit} style={{ padding: "2rem 4rem" }}>
        <label>
          Pen Name
          <input
            name="penName"
            value={authorData.penName}
            onChange={handleChange}
            aria-invalid={formErrors.penName ? "true" : undefined}
            required
          />
        </label>
        {formErrors.penName && <ErrorMsg message={formErrors.penName} />}

        <label>
          Bio
          <input
            name="bio"
            value={authorData.bio}
            onChange={handleChange}
            aria-invalid={formErrors.bio ? "true" : undefined}
          />
        </label>
        {formErrors.bio && <ErrorMsg message={formErrors.bio} />}

        <fieldset>
          <legend>
            <strong>Social Links</strong>
          </legend>

          <input
            name="socialLinks-website"
            placeholder="Website"
            value={authorData.socialLinks.website}
            onChange={handleChange}
            aria-invalid={
              formErrors["socialLinks.website"] ? "true" : undefined
            }
          />
          {formErrors["socialLinks.website"] && (
            <ErrorMsg message={formErrors["socialLinks.website"]} />
          )}

          <div className="grid">
            <div>
              <input
                name="socialLinks-x"
                placeholder="X (Twitter)"
                value={authorData.socialLinks.x}
                onChange={handleChange}
                aria-invalid={formErrors["socialLinks.x"] ? "true" : undefined}
              />
              {formErrors["socialLinks.x"] && (
                <ErrorMsg message={formErrors["socialLinks.x"]} />
              )}
            </div>

            <div>
              <input
                name="socialLinks-instagram"
                placeholder="Instagram"
                value={authorData.socialLinks.instagram}
                onChange={handleChange}
                aria-invalid={
                  formErrors["socialLinks.instagram"] ? "true" : undefined
                }
              />
              {formErrors["socialLinks.instagram"] && (
                <ErrorMsg message={formErrors["socialLinks.instagram"]} />
              )}
            </div>
          </div>
        </fieldset>

        {formErrors.general && <ErrorMsg message={formErrors.general} />}

        <button type="submit">Complete Onboarding</button>
      </form>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </article>
  );
}
