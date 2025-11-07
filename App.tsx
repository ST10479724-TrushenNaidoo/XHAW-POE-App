/*Code Attributions
Title: React useState Hook
Author: W3Schools
Accessible at: https://www.w3schools.com/react/react_usestate.asp

Title: JavaScript Array map() Method
Author: W3Schools
Accessible at: https://www.w3schools.com/jsref/jsref_map.asp

Title: JavaScript Array filter() Method
Author: W3Schools
Accessible at: https://www.w3schools.com/jsref/jsref_filter.asp

Title: JavaScript Array reduce() Method
Author: W3Schools
Accessible at: https://www.w3schools.com/jsref/jsref_reduce.asp

Title: JavaScript Objects
Author: W3Schools
Accessible at: https://www.w3schools.com/js/js_objects.asp

Title: JavaScript Events
Author: W3Schools
Accessible at: https://www.w3schools.com/js/js_events.asp

Title: React Conditional Rendering
Author: W3Schools
Accessible at: https://www.w3schools.com/react/react_conditional_rendering.asp

Title: React Components
Author: W3Schools
Accessible at: https://www.w3schools.com/react/react_components.asp
*/

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';

export default function App() {
  // State management for navigation and data
  const [currentScreen, setCurrentScreen] = useState('home'); // Current active screen
  const [selectedCourse, setSelectedCourse] = useState<any>(null); // Currently selected course for detail view
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Courses data - Contains all available training courses
  const courses = [
    {
      id: 'first-aid',
      title: 'First Aid Training',
      description: 'Comprehensive first aid training for domestic workers and gardeners. Learn essential life-saving skills for home and garden environments.',
      duration: '6 Weeks',
      category: '6-week',
      fee: 1500,
      curriculum: [
        'Wounds and bleeding',
        'Burns and fractures',
        'Emergency scene management',
        'CPR',
        'Respiratory distress '
      ],
      benefits: [
        'Professional certification',
        'Increased employability',
        'Higher earning potential',
        'Life-saving skills'
      ]
    },
    {
      id: 'sewing',
      title: 'Sewing Course',
      description: 'Professional sewing and tailoring course. Learn to repair, alter, and create clothing and household items.',
      duration: '6 Weeks',
      category: '6-week',
      fee: 1500,
      curriculum: [
        'Types of stitches',
        'Threading a sewing machine',
        'Sewing buttons, zips, hems and seams',
        'Alterations',
        'Design garments'
      ],
      benefits: [
        'Start your own business',
        'Additional income source',
        'Professional certification',
        'Practical life skill'
      ]
    },
    {
      id: 'cooking',
      title: 'Professional Cooking',
      description: 'Comprehensive cooking course covering basic to advanced culinary skills for domestic and professional settings.',
      duration: '6 Months',
      category: '6-month',
      fee: 750,
      curriculum: [
        'Nutritional requirements for a healthy body',
        'Types of protein, carbohydrates and vegetables',
        'Planning meals',
        'Tasty and nutritious meals',
        'Preparation and cooking of meals'
      ],
      benefits: [
        'Professional chef certification',
        'Higher salary potential',
        'Private chef opportunities',
        'Catering business potential'
      ]
    },
    {
      id: 'child-minding',
      title: 'Child Minding',
      description: 'Professional child care and development course. Learn age-appropriate activities, safety, and developmental support.',
      duration: '6 Months',
      category: '6-month',
      fee: 750,
      curriculum: [
        'Birth to six-month baby needs',
        'Toddler needs',
        'Educational Toys'
      ],
      benefits: [
        'Professional nanny certification',
        'Higher earning potential',
        'International opportunities',
        'Specialized child care skills'
      ]
    },
    {
      id: 'garden-maintenance',
      title: 'Garden Maintenance',
      description: 'Professional garden care and maintenance course. Learn landscaping, plant care, and garden management.',
      duration: '6 Months',
      category: '6-month',
      fee: 750,
      curriculum: [
        'Water Restrictions',
        'Pruning and propagation',
        'Planting techniques'
      ],
      benefits: [
        'Professional gardener certification',
        'Multiple client opportunities',
        'Regular income stream',
        'Physical outdoor work'
      ]
    },
    {
      id: 'life-skills',
      title: 'Life Skills Training',
      description: 'Essential life skills for personal and professional development in domestic work environments.',
      duration: '6 Weeks',
      category: '6-week',
      fee: 1500,
      curriculum: [
        'Opening a bank account',
        'Basic labour law',
        'Basic literacy',
        'Numeric literacy'
      ],
      benefits: [
        'Improved confidence',
        'Better employment opportunities',
        'Personal development',
        'Enhanced communication'
      ]
    }
  ];

  // Fee calculator state with multiple course selection
  const [feeData, setFeeData] = useState({
    selectedCourses: [] as string[], // Array of course IDs for multi-selection
    paymentPlan: 'monthly' // Default payment plan
  });
  const [calculatedFee, setCalculatedFee] = useState<any>(null); // Stores calculated fee result

  // Toggle course selection in fee calculator
  const toggleCourseSelection = (courseId: string) => {
    setFeeData(prev => {
      const isSelected = prev.selectedCourses.includes(courseId);
      if (isSelected) {
        // Remove course from selection
        return {
          ...prev,
          selectedCourses: prev.selectedCourses.filter(id => id !== courseId)
        };
      } else {
        // Add course to selection
        return {
          ...prev,
          selectedCourses: [...prev.selectedCourses, courseId]
        };
      }
    });
  };

  // Calculate discount based on number of courses selected
  const calculateDiscount = (numCourses: number): number => {
    if (numCourses === 1) return 0; // No discount
    if (numCourses === 2) return 0.05; // 5% discount
    if (numCourses === 3) return 0.10; // 10% discount
    if (numCourses > 3) return 0.15; // 15% discount for 4+ courses
    return 0;
  };

  // Calculate fee function with multiple courses and payment plans
  const calculateCourseFee = () => {
    // Validate at least one course is selected
    if (feeData.selectedCourses.length === 0) {
      Alert.alert('Error', 'Please select at least one course');
      return;
    }

    // Get selected courses data
    const selectedCoursesData = courses.filter(course => 
      feeData.selectedCourses.includes(course.id)
    );

    // Calculate base fee total
    let totalBaseFee = selectedCoursesData.reduce((sum, course) => sum + course.fee, 0);
    const numCourses = selectedCoursesData.length;
    const discountRate = calculateDiscount(numCourses);
    const discountAmount = totalBaseFee * discountRate;
    
    let finalFee = totalBaseFee - discountAmount;

    // Apply payment plan adjustments
    switch(feeData.paymentPlan) {
      case 'full':
        // Additional 5% discount for full payment
        finalFee *= 0.95;
        break;
      case 'installment':
        // 10% increase for installment plan
        finalFee *= 1.10;
        break;
      // 'monthly' case - no additional adjustment
    }

    // Set calculated fee result
    setCalculatedFee({
      courses: selectedCoursesData.map(course => course.title),
      baseFees: selectedCoursesData.map(course => ({
        title: course.title,
        fee: course.fee
      })),
      totalBaseFee: Math.round(totalBaseFee),
      discountRate: discountRate * 100,
      discountAmount: Math.round(discountAmount),
      finalFee: Math.round(finalFee),
      paymentPlan: feeData.paymentPlan,
      numCourses: numCourses
    });
  };

  // Handle payment process with confirmation dialogs
  const handlePayment = () => {
    if (!calculatedFee) {
      Alert.alert('Error', 'Please calculate fees first');
      return;
    }

    // Show payment confirmation dialog
    Alert.alert(
      'Proceed to Payment',
      `You are about to pay R ${calculatedFee.finalFee} for ${calculatedFee.numCourses} course(s). You will be redirected to our secure payment portal.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue to Payment', 
          onPress: () => {
            // Simulate payment processing
            Alert.alert(
              'Payment Processing',
              'Redirecting to secure payment gateway...',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    // Simulate successful payment after delay
                    setTimeout(() => {
                      Alert.alert(
                        'Payment Successful! ',
                        `Thank you for your payment of R ${calculatedFee.finalFee}. You will receive confirmation email shortly.`,
                        [
                          {
                            text: 'Great!',
                            onPress: () => {
                              // Reset states and navigate home
                              setCalculatedFee(null);
                              setFeeData({ selectedCourses: [], paymentPlan: 'monthly' });
                              setCurrentScreen('home');
                            }
                          }
                        ]
                      );
                    }, 2000);
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  // Handle contact form submission
  const handleContactSubmit = () => {
    // Validate required fields
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Show success message
    Alert.alert(
      'Message Sent!', 
      'Thank you for contacting Empowering The Nation! We will get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form and navigate home
            setContactForm({ name: '', email: '', phone: '', message: '' });
            setCurrentScreen('home');
          }
        }
      ]
    );
  };

  // Logo component that acts as a home navigation link
  const LogoLink = () => (
    <TouchableOpacity 
      style={styles.logoContainer}
      onPress={() => setCurrentScreen('home')}
      activeOpacity={0.7}
    >
      <Image 
        source={require('./assets/logo.png')} 
        style={styles.logoImage}
        resizeMode="contain"
      />
      <View style={styles.logoTextContainer}>
        <Text style={styles.logo}>Empowering The Nation</Text>
        <Text style={styles.subtitle}>Skills Training for Domestic Workers & Gardeners</Text>
      </View>
    </TouchableOpacity>
  );

  // Screen Components

  /**
   * Home Screen - Main landing page with overview and featured content
   */
  const HomeScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <LogoLink />
      </View>

      {/* Mission and Vision Section */}
      <View style={styles.missionSection}>
        <Text style={styles.missionTitle}>Our Mission & Vision</Text>
        <Text style={styles.missionText}>
          At Empowering The Nation, we are committed to transforming lives through skills development and 
          economic empowerment. Our mission is to provide accessible, high-quality training programs 
          that enable domestic workers and gardeners across South Africa to enhance their professional 
          capabilities, increase their earning potential, and achieve financial independence.
        </Text>
        <Text style={styles.missionText}>
          We believe in building a nation where every individual has the opportunity to develop 
          marketable skills, gain professional certification, and contribute meaningfully to 
          South Africa's economy while improving their quality of life.
        </Text>
      </View>

      {/* Hero Section with Call-to-Action */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Build Your Future</Text>
        <Text style={styles.heroText}>
          Gain professional skills, increase employability, and boost your income with certified training programs in South Africa.
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => setCurrentScreen('courses')}
          >
            <Text style={styles.buttonText}>View All Courses</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Action Buttons */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => {
            setFeeData({ selectedCourses: [], paymentPlan: 'monthly' });
            setCalculatedFee(null);
            setCurrentScreen('fee-calculator');
          }}
        >
          <Text style={styles.quickActionText}> Calculate Fees</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => setCurrentScreen('contact')}
        >
          <Text style={styles.quickActionText}> Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Courses Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Courses</Text>
        {courses.slice(0, 3).map(course => (
          <TouchableOpacity 
            key={course.id}
            style={styles.courseCard}
            onPress={() => {
              setSelectedCourse(course);
              setCurrentScreen('course-detail');
            }}
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDuration}>{course.duration}</Text>
            <Text style={styles.courseFee}>R {course.fee}</Text>
            <Text style={styles.courseDescription} numberOfLines={2}>
              {course.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Statistics/Impact Section */}
      <View style={styles.stats}>
        <Text style={styles.statsTitle}>Our Impact</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1,250+</Text>
            <Text style={styles.statLabel}>Students Trained</Text>
            <Text style={styles.statDescription}>Across all 9 provinces of South Africa</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>94%</Text>
            <Text style={styles.statLabel}>Employment Rate</Text>
            <Text style={styles.statDescription}>Graduates employed within 3 months</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>R2.3M+</Text>
            <Text style={styles.statLabel}>Income Generated</Text>
            <Text style={styles.statDescription}>Additional annual income for graduates</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Courses Available</Text>
            <Text style={styles.statDescription}>Professional skills training programs</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  /**
   * Courses Screen - Displays all available courses
   */
  const CoursesScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <LogoLink />
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>← Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Courses List */}
      <View style={styles.coursesList}>
        {courses.map(course => (
          <TouchableOpacity 
            key={course.id}
            style={styles.courseCard}
            onPress={() => {
              setSelectedCourse(course);
              setCurrentScreen('course-detail');
            }}
          >
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDuration}>{course.duration}</Text>
            <Text style={styles.courseFee}>R {course.fee}</Text>
            <Text style={styles.courseDescription}>
              {course.description}
            </Text>
            <View style={styles.enquireButton}>
              <Text style={styles.enquireButtonText}>View Details →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  /**
   * Course Detail Screen - Detailed view of a single course
   */
  const CourseDetailScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <LogoLink />
        <TouchableOpacity onPress={() => setCurrentScreen('courses')} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>← Back to Courses</Text>
        </TouchableOpacity>
      </View>

      {/* Course Details */}
      {selectedCourse && (
        <View style={styles.courseDetail}>
          <Text style={styles.courseDetailTitle}>{selectedCourse.title}</Text>
          <View style={styles.courseMeta}>
            <Text style={styles.courseMetaText}>Duration: {selectedCourse.duration}</Text>
            <Text style={styles.courseMetaText}>Fee: R {selectedCourse.fee}</Text>
          </View>

          <Text style={styles.sectionTitle}>Course Description</Text>
          <Text style={styles.courseDescription}>{selectedCourse.description}</Text>

          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          {selectedCourse.curriculum.map((item: string, index: number) => (
            <Text key={index} style={styles.curriculumItem}>• {item}</Text>
          ))}

          <Text style={styles.sectionTitle}>Career Benefits</Text>
          {selectedCourse.benefits.map((item: string, index: number) => (
            <Text key={index} style={styles.curriculumItem}>• {item}</Text>
          ))}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                setFeeData({ selectedCourses: [selectedCourse.id], paymentPlan: 'monthly' });
                setCalculatedFee(null);
                setCurrentScreen('fee-calculator');
              }}
            >
              <Text style={styles.buttonText}>Calculate Fees</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={() => {
                setContactForm(prev => ({
                  ...prev,
                  message: `I'm interested in the ${selectedCourse.title} course`
                }));
                setCurrentScreen('contact');
              }}
            >
              <Text style={styles.buttonText}>Enquire Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );

  /**
   * Fee Calculator Screen - Calculate course fees with multiple selections
   */
  const FeeCalculatorScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <LogoLink />
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>← Back to Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calculatorForm}>
        {/* Course Selection Section */}
        <Text style={styles.label}>Select Courses (Multiple Selection)</Text>
        <Text style={styles.discountInfo}>
          Discounts: 1 course (0%) • 2 courses (5%) • 3 courses (10%) • 4+ courses (15%)
        </Text>
        
        <View style={styles.picker}>
          {courses.map(course => (
            <TouchableOpacity
              key={course.id}
              style={[
                styles.pickerOption,
                feeData.selectedCourses.includes(course.id) && styles.pickerOptionSelected
              ]}
              onPress={() => toggleCourseSelection(course.id)}
            >
              <View style={styles.courseSelection}>
                {/* Custom Checkbox */}
                <View style={[
                  styles.checkbox,
                  feeData.selectedCourses.includes(course.id) && styles.checkboxSelected
                ]}>
                  {feeData.selectedCourses.includes(course.id) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <View style={styles.courseInfo}>
                  <Text style={feeData.selectedCourses.includes(course.id) ? styles.pickerOptionTextSelected : styles.pickerOptionText}>
                    {course.title} - {course.duration}
                  </Text>
                  <Text style={feeData.selectedCourses.includes(course.id) ? styles.pickerOptionTextSelected : styles.pickerOptionText}>
                    R {course.fee}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Plan Selection */}
        <Text style={styles.label}>Payment Plan</Text>
        <View style={styles.picker}>
          {[
            { value: 'monthly', label: 'Monthly Payments' },
            { value: 'full', label: 'Full Payment (Additional 5% discount)' },
            { value: 'installment', label: 'Installment Plan (10% admin fee)' }
          ].map(plan => (
            <TouchableOpacity
              key={plan.value}
              style={[
                styles.pickerOption,
                feeData.paymentPlan === plan.value && styles.pickerOptionSelected
              ]}
              onPress={() => setFeeData(prev => ({ ...prev, paymentPlan: plan.value }))}
            >
              <Text style={feeData.paymentPlan === plan.value ? styles.pickerOptionTextSelected : styles.pickerOptionText}>
                {plan.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calculate Button */}
        <TouchableOpacity style={styles.calculateButton} onPress={calculateCourseFee}>
          <Text style={styles.calculateButtonText}>
            Calculate Total Fee ({feeData.selectedCourses.length} courses selected)
          </Text>
        </TouchableOpacity>

        {/* Calculation Results */}
        {calculatedFee && (
          <View style={styles.result}>
            <Text style={styles.resultTitle}>Fee Calculation Result</Text>
            
            <Text style={styles.resultSection}>Selected Courses:</Text>
            {calculatedFee.baseFees.map((course: any, index: number) => (
              <Text key={index} style={styles.resultItem}>
                • {course.title}: R {course.fee}
              </Text>
            ))}
            
            <Text style={styles.resultSection}>Summary:</Text>
            <Text style={styles.resultItem}>Total Base Fee: R {calculatedFee.totalBaseFee}</Text>
            <Text style={styles.resultItem}>Bundle Discount ({calculatedFee.discountRate}%): -R {calculatedFee.discountAmount}</Text>
            
            {/* Payment Plan Specific Adjustments */}
            {calculatedFee.paymentPlan === 'full' && (
              <Text style={styles.resultItem}>Full Payment Discount (5%): -R {Math.round(calculatedFee.finalFee * 0.05)}</Text>
            )}
            {calculatedFee.paymentPlan === 'installment' && (
              <Text style={styles.resultItem}>Installment Admin Fee (10%): +R {Math.round(calculatedFee.finalFee * 0.10)}</Text>
            )}
            
            <Text style={styles.resultTotal}>Final Total Fee: R {calculatedFee.finalFee}</Text>
            
            {/* Payment Button */}
            <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
              <Text style={styles.paymentButtonText}> Proceed to Payment</Text>
            </TouchableOpacity>
            
            <Text style={styles.paymentNote}>
              Secure payment via credit card, EFT, or mobile money
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  /**
   * Contact Screen - Contact form and company information
   */
  const ContactScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <LogoLink />
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.backButtonContainer}>
          <Text style={styles.backButton}>← Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <Text style={styles.contactTitle}>Empowering the Nation</Text>
        <Text style={styles.contactDetail}> Email: info@empoweringnation.co.za</Text>
        <Text style={styles.contactDetail}> Phone: +27 11 123 4567</Text>
        <Text style={styles.contactDetail}> Address: Johannesburg, South Africa</Text>
        <Text style={styles.contactDetail}> Hours: Mon-Fri 8:00-17:00</Text>
      </View>

      {/* Contact Form */}
      <View style={styles.contactForm}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={contactForm.name}
          onChangeText={(text) => setContactForm(prev => ({ ...prev, name: text }))}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={contactForm.email}
          onChangeText={(text) => setContactForm(prev => ({ ...prev, email: text }))}
          placeholder="Enter your email address"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          value={contactForm.phone}
          onChangeText={(text) => setContactForm(prev => ({ ...prev, phone: text }))}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Your Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={contactForm.message}
          onChangeText={(text) => setContactForm(prev => ({ ...prev, message: text }))}
          placeholder="Tell us about your training needs or ask any questions..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleContactSubmit}
        >
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Main screen renderer with navigation
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'courses':
        return <CoursesScreen />;
      case 'course-detail':
        return <CourseDetailScreen />;
      case 'fee-calculator':
        return <FeeCalculatorScreen />;
      case 'contact':
        return <ContactScreen />;
      default:
        return <HomeScreen />;
    }
  };

  /**
   * Bottom Navigation Component - App navigation bar
   */
  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setCurrentScreen('home')}
      >
        <Text style={currentScreen === 'home' ? styles.navTextActive : styles.navText}> Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setCurrentScreen('courses')}
      >
        <Text style={currentScreen.includes('course') ? styles.navTextActive : styles.navText}> Courses</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => {
          setFeeData({ selectedCourses: [], paymentPlan: 'monthly' });
          setCalculatedFee(null);
          setCurrentScreen('fee-calculator');
        }}
      >
        <Text style={currentScreen === 'fee-calculator' ? styles.navTextActive : styles.navText}> Fees</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setCurrentScreen('contact')}
      >
        <Text style={currentScreen === 'contact' ? styles.navTextActive : styles.navText}> Contact</Text>
      </TouchableOpacity>
    </View>
  );

  // Main App Render
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007749" barStyle="light-content" />
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}

// Stylesheet - Comprehensive styling for all components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainContent: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#007749', // Primary green color
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 8,
  },
  logoTextContainer: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFB81C', // Gold accent color
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  backButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  missionSection: {
    backgroundColor: '#f8f9fa', // Light gray background
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007749', // Green accent border
  },
  missionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 10,
    textAlign: 'center',
  },
  missionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  backButton: {
    color: '#FFB81C', // Gold color
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  hero: {
    backgroundColor: '#FFB81C', // Gold background
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007749', // Green text
    textAlign: 'center',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    color: '#007749',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#007749', // Green button
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007749', // Green border
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickAction: {
    backgroundColor: '#007749',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 15,
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB81C', // Gold accent border
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 4,
  },
  courseDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  courseFee: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFB81C', // Gold price
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  enquireButton: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef', // Light border
  },
  enquireButtonText: {
    color: '#007749',
    fontWeight: '600',
    fontSize: 14,
  },
  coursesList: {
    marginBottom: 20,
  },
  courseDetail: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#007749', // Green accent border
  },
  courseDetailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 10,
    textAlign: 'center',
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  courseMetaText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  curriculumItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  stats: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB81C', // Gold accent border
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFB81C',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  statDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
  calculatorForm: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#007749', // Green accent border
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 8,
  },
  discountInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  picker: {
    marginBottom: 20,
  },
  pickerOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#dee2e6', // Light border
    borderRadius: 8,
    marginBottom: 8,
  },
  pickerOptionSelected: {
    backgroundColor: '#007749', // Green selected background
    borderColor: '#007749',
  },
  courseSelection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#FFB81C', // Gold selected checkbox
    borderColor: '#FFB81C',
  },
  checkmark: {
    color: '#007749', // Green checkmark
    fontWeight: 'bold',
    fontSize: 12,
  },
  courseInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#495057', // Dark gray text
  },
  pickerOptionTextSelected: {
    fontSize: 14,
    color: '#ffffff', // White text for selected
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#007749',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  calculateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    backgroundColor: '#f0f9f4', // Light green background
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007749',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007749',
    marginBottom: 10,
  },
  resultSection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007749',
    marginTop: 10,
    marginBottom: 5,
  },
  resultItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
    marginLeft: 10,
  },
  resultTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB81C', // Gold total amount
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#b8d4f0',
  },
  paymentButton: {
    backgroundColor: '#FFB81C', // Gold payment button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  paymentButtonText: {
    color: '#007749', // Green text on gold
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  contactInfo: {
    backgroundColor: '#007749',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  contactDetail: {
    fontSize: 16,
    color: '#FFB81C', // Gold contact details
    marginBottom: 8,
    fontWeight: '500',
  },
  contactForm: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB81C', // Gold accent border
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa', // Light gray background
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007749',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#007749',
    borderTopWidth: 2,
    borderTopColor: '#FFB81C', // Gold top border
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#ffffff',
  },
  navTextActive: {
    fontSize: 12,
    color: '#FFB81C', // Gold active nav text
    fontWeight: 'bold',
  },
});

/*REFERENCES

Title: JavaScript Tutorial
Author: W3Schools
Accessible at: https://www.w3schools.com/js/

Title: React Tutorial
Author: W3Schools
Accessible at: https://www.w3schools.com/react/

Title: React useState Hook
Author: W3Schools
Accessible at: https://www.w3schools.com/react/react_usestate.asp

Title: JavaScript Array Methods
Author: W3Schools
Accessible at: https://www.w3schools.com/js/js_array_methods.asp

Title: JavaScript Objects
Author: W3Schools
Accessible at: https://www.w3schools.com/js/js_objects.asp

Title: CSS Flexbox
Author: W3Schools
Accessible at: https://www.w3schools.com/css/css3_flexbox.asp

Title: CSS Colors
Author: W3Schools
Accessible at: https://www.w3schools.com/css/css_colors.asp

Title: CSS Padding
Author: W3Schools
Accessible at: https://www.w3schools.com/css/css_padding.asp

Title: CSS Border
Author: W3Schools
Accessible at: https://www.w3schools.com/css/css_border.asp

Title: JavaScript Functions
Author: W3Schools
Accessible at: https://www.w3schools.com/js/js_functions.asp

Title: JavaScript Array Map()
Author: W3Schools
Accessible at: https://www.w3schools.com/jsref/jsref_map.asp

Title: JavaScript Array Filter()
Author: W3Schools
Accessible at: https://www.w3schools.com/jsref/jsref_filter.asp

Title: JavaScript Array Reduce()
Author: W3Schools
Accessible at: https://www.w3schools.com/jsref/jsref_reduce.asp
*/