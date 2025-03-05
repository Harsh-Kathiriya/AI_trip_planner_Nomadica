import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import questionsConfig, { generateTravelPlanPrompt } from './questionsConfig';
import { useToast } from '@/hooks/use-toast';
import 'tailwindcss/tailwind.css';
import ParticlesBg from './components/custom/ParticlesBg';
import './CreateTrip.css';
import { generateTravelPlan } from './service/AIModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginDialog from './components/custom/LoginDialog';

const CreateTrip = () => {
  const { register, handleSubmit, setValue, formState: { errors }, trigger } = useForm();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, showDialog, handleShowDialog, handleLogin, setShowDialog } = useAuth();

  const handleOptionClick = (fieldLabel, optionText, multiple) => {
    setSelectedOptions(prevState => {
      const currentSelections = prevState[fieldLabel] || [];
      const isSelected = currentSelections.includes(optionText);

      if (multiple) {
        return {
          ...prevState,
          [fieldLabel]: isSelected
            ? currentSelections.filter(option => option !== optionText)
            : [...currentSelections, optionText]
        };
      } else {
        return {
          ...prevState,
          [fieldLabel]: isSelected ? [] : [optionText]
        };
      }
    });
  };

  const onSubmit = async (data) => {
    if (!isLoggedIn && !localStorage.getItem('userName')) {
      handleShowDialog();
      return;
    }

    try {
      setLoading(true); // Start loading

      const prompt = generateTravelPlanPrompt(data, selectedOptions);
      console.log(prompt);
      const result = await generateTravelPlan(prompt);
      setLoading(false); // End loading
      navigate('/mytrip', { state: { result } });
    } catch (error) {
      setLoading(false); // End loading in case of error
      toast({ title: "Error", description: "Failed to generate travel plan.", variant: "destructive" });
    }
  };

  const validateForm = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)(); // Submit the form if valid
    } else {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen my-10 flex items-center justify-center relative">
      <ParticlesBg />
      <div className="glass-container p-8 max-w-3xl w-full rounded-3xl shadow-2xl animate-fade-in">
        <form onSubmit={validateForm}>
          {questionsConfig.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-white">{section.section}</h2>
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="mb-6">
                  {field.type === 'location' && (
                    <div className="mb-6">
                      <label className="block text-white mb-3 text-lg">{field.label}</label>
                      <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
                        selectProps={{
                          placeholder: field.placeholder,
                          className: 'w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 transition duration-300',
                          onChange: (value) => setValue('location', value),
                        }}
                      />
                      {errors.location && <p className="text-red-500">Location is required</p>}
                    </div>
                  )}
                  {field.type === 'noOfDays' && (
                    <div className="mb-6">
                      <label className="block text-white mb-3 text-lg">{field.label}</label>
                      <input
                        type="number"
                        min="1"
                        max="14"
                        {...register('noOfDays', { required: true, min: 1, max: 14 })}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 transition duration-300"
                      />
                      {errors.noOfDays && <p className="text-red-500">Number of days must be between 1 and 14</p>}
                    </div>
                  )}
                  {field.type === 'number' && (
                    <div className="mb-6">
                      <label className="block text-white mb-3 text-lg">{field.label}</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        {...register('number', { required: true, min: 1, max: 10 })}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 transition duration-300"
                      />
                      {errors.number && <p className="text-red-500">Number of people must be between 1 and 10</p>}
                    </div>
                  )}
                  {field.type === 'cards' && (
                    <div className="mb-6">
                      <label className="block text-white mb-3 text-lg">{field.label}</label>
                      <div className="flex space-x-4 overflow-x-auto">
                        {field.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`flex-shrink-0 p-4 bg-gray-900 rounded-xl text-white text-center cursor-pointer transition duration-300 transform hover:scale-105 hover:bg-gray-800 ${selectedOptions[field.label] && selectedOptions[field.label].includes(option.text) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(field.label, option.text, field.label === "What type of experience are you looking for?")}
                          >
                            <div className="text-4xl mb-2">{option.icon}</div>
                            <div className="font-semibold">{option.text}</div>
                            {option.description && (
                              <div className="text-sm text-gray-400">{option.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                      {errors[field.label] && <p className="text-red-500">Please select an option for {field.label}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="mb-6">
            <label className="block text-white mb-3 text-lg">Any other specific requirements?</label>
            <textarea
              {...register('additionalRequirements')}
              placeholder="Enter any additional requirements"
              className="w-full h-24 px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
      {showDialog && (
        <LoginDialog onClose={() => setShowDialog(false)} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default CreateTrip;