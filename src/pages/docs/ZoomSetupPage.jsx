import React from "react";
import { MoveLeft, ExternalLink, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSafeBack } from "@/hooks/use-safe-back";

const ZoomSetupPage = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10 font-poppins">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <button
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-primary-color-600 transition-colors"
        >
          <MoveLeft className="h-4 w-4" />
          Back to Management
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 leading-tight">
            Zoom App Creation & Configuration Guide
          </h1>
          
          <p className="mb-8 text-gray-600 leading-relaxed">
            This guide provides step-by-step instructions for administrators on how to create the necessary Zoom apps to integrate a Zoom account with the platform.
          </p>

          <div className="mb-10 rounded-2xl bg-blue-50 p-6 border border-blue-100">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 leading-relaxed">
                The platform requires a <strong>Server-to-Server OAuth App</strong> to manage meetings (create, update, delete) and a <strong>Meeting SDK App</strong> to allow users to join meetings directly within the platform.
              </p>
            </div>
          </div>

          <hr className="my-10 border-gray-100" />

          {/* Part 1 */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-color-100 text-sm text-primary-color-600">1</span>
              Part 1: Creating the Server-to-Server OAuth App
            </h2>
            <p className="mb-6 text-gray-600">
              This app allows the platform's backend server to communicate with Zoom to schedule and manage live sessions on behalf of the Zoom account.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 1: Access the Zoom App Marketplace</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-2">
                  <li>Go to the <a href="https://marketplace.zoom.us/" target="_blank" rel="noreferrer" className="text-primary-color-600 hover:underline inline-flex items-center gap-1">Zoom App Marketplace <ExternalLink className="h-3 w-3" /></a>.</li>
                  <li>Sign in with the admin credentials for the Zoom account you want to integrate.</li>
                  <li>In the top right corner, click <strong>Develop</strong> &gt; <strong>Build App</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 2: Create the App</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-2">
                  <li>Locate the <strong>Server-to-Server OAuth</strong> card.</li>
                  <li>Click <strong>Create</strong>.</li>
                  <li>Enter an <strong>App Name</strong> (e.g., <code className="bg-gray-100 px-1 rounded">[Your Platform Name] Server Integration</code>) and click <strong>Create</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 3: Note the App Credentials</h3>
                <p className="mb-3 text-sm text-gray-600">You will be redirected to the <strong>App Credentials</strong> tab. Copy these securely:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4 font-medium">
                  <li>Account ID</li>
                  <li>Client ID</li>
                  <li>Client Secret</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 4: Configure App Information</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-2">
                  <li>Go to the <strong>Information</strong> tab.</li>
                  <li>Fill out <strong>Company Name</strong> and <strong>Developer Contact Information</strong>.</li>
                  <li>Click <strong>Continue</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 5: Add Scopes (Permissions)</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-2">
                  <li>Go to the <strong>Scopes</strong> tab and click <strong>+ Add Scopes</strong>.</li>
                  <li>Add the following required scopes:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1 font-mono text-[13px] text-gray-500">
                      <li>meeting:write:meeting:admin</li>
                      <li>meeting:read:meeting:admin</li>
                      <li>meeting:read:participant:admin</li>
                      <li>user:read:meeting:admin</li>
                      <li>user:read:token:admin</li>
                      <li>user:read:token</li>
                      <li>cloud_recording:read:recording:admin</li>
                    </ul>
                  </li>
                  <li>Click <strong>Done</strong> and then <strong>Continue</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 6: Activate the App</h3>
                <p className="text-sm text-gray-600 ml-2">
                  Go to the <strong>Activation</strong> tab and click <strong>Activate your app</strong>.
                </p>
              </div>
            </div>
          </section>

          <hr className="my-10 border-gray-100" />

          {/* Part 2 */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-color-100 text-sm text-primary-color-600">2</span>
              Part 2: Creating the Meeting SDK App 
            </h2>
            
            <div className="mb-8 rounded-xl bg-orange-50 p-5 border border-orange-100">
              <p className="text-sm text-orange-800 leading-relaxed">
                <strong>Note:</strong> This step is only required if you want this specific Zoom account to use its <em>own</em> Meeting SDK credentials. If omitted, the platform will use global defaults.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 1: Create the Meeting SDK App</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-2">
                  <li>Go back to <strong>Develop</strong> &gt; <strong>Build App</strong>.</li>
                  <li>Select <strong>General App</strong>.</li>
                  <li>Under the embedded section, select <strong>Zoom Meetings</strong> as the product under the General App.</li>
                  <li>Enter an <strong>App Name</strong> (e.g., <code className="bg-gray-100 px-1 rounded">Meeting SDK</code>) and click <strong>Create</strong>.</li>
                  <li>Continue by filling out the required information details on the subsequent pages.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 2: Note the SDK Credentials</h3>
                <p className="mb-3 text-sm text-gray-600 ml-2">On the <strong>Basic Information</strong> page, locate the App credentials section:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-6 font-medium">
                  <li>Client ID (This is your SDK Key)</li>
                  <li>Client Secret (This is your SDK Secret)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 3: Enable Meeting SDK</h3>
                <p className="text-sm text-gray-600 ml-2">
                  On the <strong>Features</strong> page, go to the <strong>Embed</strong> tab, and toggle <strong>Meeting SDK</strong> on to enable it.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 4: Select Scopes</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 ml-2">
                  <li>Go to the <strong>Scopes</strong> page and select <strong>Add Scopes</strong>.</li>
                  <li>Select <strong>User</strong> and check the box for <strong>View all user information</strong> (or <strong>View a user's zak token</strong>).</li>
                  <li>Select <strong>Done</strong>.</li>
                </ol>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-800">Step 5: Activate</h3>
                <p className="text-sm text-gray-600 ml-2">
                  Complete any remaining required fields in the setup process and ensure the app is fully activated on your account.
                </p>
              </div>
            </div>
          </section>

          <hr className="my-10 border-gray-100" />

          {/* Part 3 */}
          <section>
            <h2 className="mb-6 text-2xl font-bold text-gray-800 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-color-100 text-sm text-primary-color-600">3</span>
              Part 3: Adding the Account to the Platform
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <ol className="list-decimal list-inside space-y-4 text-sm text-gray-600">
                <li>Log into the <strong>Platform Admin Dashboard</strong>.</li>
                <li>Navigate to <strong>Zoom Management</strong> &gt; <strong>Add Zoom Account</strong>.</li>
                <li>Fill in the form using the credentials you copied earlier.</li>
                <li>(Optional) Expand <strong>Meeting SDK credentials</strong> to add SDK Key/Secret.</li>
                <li>Click <strong>Add Account</strong>.</li>
                <li>Use the <strong>Test</strong> (flask icon) button on the card to verify connectivity.</li>
                <li>Click <strong>Activate</strong> to enable the account for scheduling.</li>
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ZoomSetupPage;
