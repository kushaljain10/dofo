import React, { useState } from "react";
import {
  DevicePhoneMobileIcon,
  CalendarDaysIcon,
  PhotoIcon,
  EnvelopeIcon,
  UserGroupIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface Connector {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  required: boolean;
  connected: boolean;
}

interface ConnectorsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ConnectorsStep: React.FC<ConnectorsStepProps> = ({ onNext, onBack }) => {
  const [connectors, setConnectors] = useState<Connector[]>([
    {
      id: "contacts",
      name: "Contacts",
      description: "Import your contacts to build your relationship graph",
      icon: UserGroupIcon,
      color: "purple",
      required: true,
      connected: false,
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Track meetings and events with people",
      icon: CalendarDaysIcon,
      color: "blue",
      required: true,
      connected: false,
    },
    {
      id: "photos",
      name: "Photos",
      description: "Recognize faces and moments with people you care about",
      icon: PhotoIcon,
      color: "green",
      required: false,
      connected: false,
    },
    {
      id: "email",
      name: "Email",
      description: "Detect important moments and job changes",
      icon: EnvelopeIcon,
      color: "orange",
      required: false,
      connected: false,
    },
  ]);

  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-100 text-purple-600 border-purple-200",
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      orange: "bg-orange-100 text-orange-600 border-orange-200",
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const handleConnect = async (connectorId: string) => {
    setIsConnecting(connectorId);

    // Simulate connection process
    setTimeout(() => {
      setConnectors((prev) =>
        prev.map((conn) =>
          conn.id === connectorId ? { ...conn, connected: true } : conn
        )
      );
      setIsConnecting(null);
    }, 2000);
  };

  const requiredConnected = connectors.filter(
    (c) => c.required && c.connected
  ).length;
  const totalRequired = connectors.filter((c) => c.required).length;
  const canProceed = requiredConnected === totalRequired;

  return (
    <div className="min-h-screen gradient-minimal flex flex-col">
      {/* Header */}
      <div className="relative px-6 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-minimal mb-3">
            Connect Sources
          </h1>
          <p className="text-lg font-medium text-gray-600 mb-6">
            Help DoFo understand your relationships
          </p>

          {/* Progress */}
          <div className="max-w-sm mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Required sources</span>
              <span>
                {requiredConnected}/{totalRequired}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(requiredConnected / totalRequired) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 space-y-4 pb-24">
        {connectors.map((connector) => {
          const Icon = connector.icon;
          const colorClasses = getColorClasses(connector.color);

          return (
            <div key={connector.id} className="card-floating p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {connector.name}
                    </h3>
                    {connector.required && (
                      <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {connector.description}
                  </p>

                  {connector.connected ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckIcon className="w-5 h-5" />
                      <span className="text-sm font-semibold">Connected</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(connector.id)}
                      disabled={isConnecting === connector.id}
                      className="btn-glass hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isConnecting === connector.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Connecting...</span>
                        </div>
                      ) : (
                        "Connect"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Privacy Note */}
        <div className="card-glass p-6 bg-blue-50 border border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Privacy First
              </h4>
              <p className="text-sm text-blue-700">
                Your data is processed on-device when possible. We only access
                what's needed to help you maintain relationships.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 space-y-4">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full py-4 px-6 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-200"
        >
          <span>Continue</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        <div className="flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back
          </button>

          <button
            onClick={onNext}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectorsStep;
