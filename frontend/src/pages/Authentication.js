import { json } from "react-router-dom";

import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  fetch("http://localhost:8080/" + mode);
}
// 314. Implementing the Auth Action
// We must add an action to our route (in AuthForm.js), an action that is triggered when Form is submitted.
// STEP 1:
// 1.1 Export an async function called "action", and that action will be triggered whenever this "<AuthForm>" is submitted, because it is on the same route as this "authForm" is on.
// 1.2 In this "action", we must get access to the form data that was submitted. We do that with help of the "request" object, that's part of that data package that, we get as a parameter in "action" function, tht is executed by r-r-d.
// 1.3 We want to get hold of the data that was submitted with the form.
// 1.4 We can do that by calling "request.formData", and we await this, and this gives us a "data" object, which we can then use to search for the email and the password that was entered. /// "const data = await request.formData();"
// 1.5 we can add and construct a "authData" object, where the "email" is retrived with help of "data.get("email")" (this ".get" method exist on this data object, that is returned by "formData") So this gives us the "email" address that was entered by the user.
// 1.6 Password the same as "email".
// We also must take a look at this query parameter, in our "action", to find out where a signup, or login request, should be sent.
// We can't use "useSearchParams" that won't work, because we're nor ii a component here. But we can use the built-in URL constructor, which is provided by the browser, and pass our request to it, to then access the "searchParams" object on that URL object, that's instantiated here.
// 1.7 "const searchParams = new URL(request.url).searchParams" - hold of our "searchParams" on the backend, with some default browser features.
// And then, on that "searchParams" object, we can also get, and extract the "mode".
// We can also say that if it's "undefined", we maybe wanna use signup as a default, or "login"...
// 1.8 "const mode = searchParams.get('mode') || 'login'"
// So now we know which mide we are in, and we can get the data. Therefore, now we have everything we need to send a request to that backend.
// 1.9 Send request with "fetch()" function. /// "fetch("http://localhost:8080/" + mode)" or "/login" based on which "mode" we are in.
// 1.10 Add "ifcheck" if mode is not equal to "login" and "mode" is not equal to "signup" and if that's the case, we could throw a new error here. We could throw a new error response ("throw json()"). And import "json" function from r-r-d.
// 1.11 Where we set "message" and "status: 422" - for invalid user input.
// 1.12
// 314. Implementing the Auth Action
