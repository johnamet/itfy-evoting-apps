'use client';

import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnnouncementBar from '@/components/AnnouncementBar';
import Link from 'next/link';
import { 
  FileText, Users, Vote, CheckCircle, ShieldCheck, 
  AlertCircle, Info, Award, CreditCard, UserPlus,
  Lock, Eye, Calendar, FileCheck, Star, Trophy
} from 'lucide-react';

export default function GuidelinesPage() {
  const sections = [
    {
      id: 'overview',
      title: 'Platform Overview',
      icon: Info,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'nomination',
      title: 'Nomination Process',
      icon: UserPlus,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'voting',
      title: 'Voting Process',
      icon: Vote,
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'candidate-requirements',
      title: 'Candidate Requirements',
      icon: Users,
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'results',
      title: 'Results & Transparency',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: FileCheck,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <>
      <AnnouncementBar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <Header />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0152be]/5 via-transparent to-blue-500/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto max-w-4xl relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Platform Guidelines
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                E-Voting Platform Guidelines
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about nominating, voting, and participating 
                in our transparent digital awards system.
              </p>
            </div>

            {/* Quick Navigation */}
            <GlassCard className="p-6 mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors group"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${section.color} text-white group-hover:scale-110 transition-transform`}>
                      <section.icon className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Guidelines Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl space-y-12">
            
            {/* Platform Overview */}
            <div id="overview" className="scroll-mt-24">
              <GlassCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <Info className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Overview</h2>
                    <p className="text-gray-600">Understanding our digital voting ecosystem</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      What is the E-Voting Platform?
                    </h3>
                    <p className="ml-7">
                      Our platform is a secure, transparent digital voting system designed for youth 
                      tech awards and recognition programs. It enables fair nomination processes, 
                      secure vote casting, and transparent result tracking.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Key Features
                    </h3>
                    <ul className="ml-7 space-y-2 list-disc list-inside">
                      <li>Dynamic nomination forms for each event category</li>
                      <li>Secure vote purchasing through Paystack integration</li>
                      <li>Multiple vote bundle options with flexible pricing</li>
                      <li>Real-time vote tracking and analytics</li>
                      <li>Transparent results display upon event completion</li>
                      <li>Mobile-responsive design for voting on any device</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-500" />
                      Security & Fairness
                    </h3>
                    <p className="ml-7">
                      All votes are tracked with unique codes and references. The system prevents 
                      duplicate voting and ensures vote integrity through secure authentication 
                      and payment verification.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Nomination Process */}
            <div id="nomination" className="scroll-mt-24">
              <GlassCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Nomination Process</h2>
                    <p className="text-gray-600">How to nominate candidates for awards</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-500" />
                      Step-by-Step Nomination Guide
                    </h3>
                    <ol className="ml-7 space-y-3 list-decimal list-inside">
                      <li className="pl-2">
                        <span className="font-medium">Browse Events:</span> Visit the{' '}
                        <Link href="/events" className="text-blue-600 hover:underline">Events page</Link>
                        {' '}to view active nomination opportunities
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Select Category:</span> Choose the appropriate 
                        award category from the{' '}
                        <Link href="/nominate" className="text-blue-600 hover:underline">Nominate page</Link>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Fill Nomination Form:</span> Complete all required 
                        fields including candidate details, qualifications, and supporting documents
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Upload Documents:</span> Provide supporting materials 
                        such as photos, certificates, or project portfolios (max file size varies by field)
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Review & Submit:</span> Verify all information 
                        before submitting your nomination
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Await Approval:</span> Admin team will review 
                        nominations within 3-5 business days
                      </li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Important Notes</h4>
                        <ul className="space-y-1 text-sm text-blue-800">
                          <li>• Nominations close on the date specified in each form</li>
                          <li>• All submissions are subject to admin approval</li>
                          <li>• Duplicate nominations will be flagged and may be rejected</li>
                          <li>• Ensure all contact information is accurate for follow-up</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Submission Status
                    </h3>
                    <div className="ml-7 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-24 text-sm font-medium text-gray-600">Pending:</div>
                        <div className="flex-1 text-sm">Awaiting admin review</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-24 text-sm font-medium text-gray-600">Approved:</div>
                        <div className="flex-1 text-sm">Candidate profile created and visible for voting</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-24 text-sm font-medium text-gray-600">Under Review:</div>
                        <div className="flex-1 text-sm">Admin team requires additional information</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-24 text-sm font-medium text-gray-600">Rejected:</div>
                        <div className="flex-1 text-sm">Does not meet eligibility criteria</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-24 text-sm font-medium text-gray-600">Duplicate:</div>
                        <div className="flex-1 text-sm">Candidate already nominated in this category</div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Voting Process */}
            <div id="voting" className="scroll-mt-24">
              <GlassCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                    <Vote className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Voting Process</h2>
                    <p className="text-gray-600">How to purchase votes and cast them</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-500" />
                      Purchasing Vote Bundles
                    </h3>
                    <ol className="ml-7 space-y-3 list-decimal list-inside">
                      <li className="pl-2">
                        <span className="font-medium">Select Event:</span> Navigate to the active 
                        event from the{' '}
                        <Link href="/events" className="text-blue-600 hover:underline">Events page</Link>
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Choose Bundle:</span> Browse available vote 
                        bundles with different quantities and pricing options
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Proceed to Payment:</span> Complete purchase 
                        through secure Paystack payment gateway (supports mobile money, cards, bank transfer)
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Receive Vote Code:</span> Upon successful payment, 
                        you&apos;ll receive a unique vote code via email/SMS
                      </li>
                      <li className="pl-2">
                        <span className="font-medium">Cast Your Votes:</span> Use your vote code to 
                        vote for your preferred candidates in available categories
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Vote className="w-5 h-5 text-blue-500" />
                      How to Cast Votes
                    </h3>
                    <ul className="ml-7 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Browse nominees in the{' '}
                          <Link href="/nominees" className="text-blue-600 hover:underline">Nominees page</Link>
                          {' '}or{' '}
                          <Link href="/categories" className="text-blue-600 hover:underline">Categories page</Link>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Click &quot;Vote&quot; on your preferred candidate&apos;s profile</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Enter your unique vote code when prompted</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Specify the number of votes you wish to allocate (based on your remaining balance)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Confirm your vote - this action is final and cannot be reversed</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Voting Rules</h4>
                        <ul className="space-y-1 text-sm text-yellow-800">
                          <li>• Each vote code can only be used once per transaction</li>
                          <li>• Votes are final and cannot be changed or refunded</li>
                          <li>• Vote codes must be used within the event&apos;s voting period</li>
                          <li>• Bundle-specific votes can only be used in designated categories</li>
                          <li>• Authentication may be required for certain event categories</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-indigo-500" />
                      Payment & Security
                    </h3>
                    <p className="ml-7">
                      All payments are processed securely through <strong>Paystack</strong>, a PCI-DSS 
                      compliant payment processor. We do not store your payment information. Each transaction 
                      receives a unique reference code for tracking and verification purposes.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Candidate Requirements */}
            <div id="candidate-requirements" className="scroll-mt-24">
              <GlassCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Candidate Requirements</h2>
                    <p className="text-gray-600">Profile standards and eligibility criteria</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-orange-500" />
                      Required Information
                    </h3>
                    <div className="ml-7 space-y-3">
                      <div>
                        <div className="font-medium text-gray-800 mb-1">Personal Information:</div>
                        <ul className="space-y-1 text-sm list-disc list-inside">
                          <li>Full name (first name and last name)</li>
                          <li>Valid email address</li>
                          <li>Phone number (optional but recommended)</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 mb-1">Profile Content:</div>
                        <ul className="space-y-1 text-sm list-disc list-inside">
                          <li>Professional biography (minimum 100 characters)</li>
                          <li>Profile photo (square format, minimum 400x400px)</li>
                          <li>Optional: Gallery images (up to 10 photos)</li>
                          <li>Optional: Video introduction or project demo</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 mb-1">Achievements & Background:</div>
                        <ul className="space-y-1 text-sm list-disc list-inside">
                          <li>Projects portfolio (with descriptions and links)</li>
                          <li>Technical skills and expertise areas</li>
                          <li>Educational background</li>
                          <li>Relevant certifications or awards</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Eligibility Criteria
                    </h3>
                    <ul className="ml-7 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Must be a youth aged 15-35 years (age requirements may vary by event)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Active involvement in technology or digital innovation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Demonstrated impact in their category of nomination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Must not have won in the same category in the previous year (for annual awards)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>Agreement to platform terms and conditions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">Profile Best Practices</h4>
                        <ul className="space-y-1 text-sm text-indigo-800">
                          <li>• Use high-quality, professional photos</li>
                          <li>• Write clear, compelling descriptions of your work</li>
                          <li>• Include verifiable links to projects or portfolios</li>
                          <li>• Highlight measurable impact and achievements</li>
                          <li>• Keep contact information up to date</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Results & Transparency */}
            <div id="results" className="scroll-mt-24">
              <GlassCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Results & Transparency</h2>
                    <p className="text-gray-600">How winners are determined and announced</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-yellow-500" />
                      Results Visibility
                    </h3>
                    <div className="ml-7 space-y-2">
                      <p>Results visibility depends on the event settings configured by organizers:</p>
                      <div className="space-y-2 mt-3">
                        <div className="flex items-start gap-2">
                          <div className="w-32 text-sm font-medium text-gray-600">Public:</div>
                          <div className="flex-1 text-sm">
                            Vote counts are visible to everyone in real-time during voting period
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-32 text-sm font-medium text-gray-600">Private:</div>
                          <div className="flex-1 text-sm">
                            Results are hidden until after the event concludes
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-32 text-sm font-medium text-gray-600">After Voting:</div>
                          <div className="flex-1 text-sm">
                            Results become visible only after the voting deadline passes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      Winner Determination
                    </h3>
                    <p className="ml-7">
                      Winners are determined based on the total number of valid votes received during 
                      the voting period. The candidate with the highest vote count in each category 
                      is declared the winner. In case of ties, the event organizers may use additional 
                      criteria or extend voting.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-500" />
                      Results Announcement
                    </h3>
                    <ul className="ml-7 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Results are typically announced within 48 hours after voting closes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Winners are notified via email and phone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Official announcement on website and social media channels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Award ceremony details shared with winners and participants</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 mb-1">Vote Integrity</h4>
                        <p className="text-sm text-green-800">
                          All votes are tracked with unique codes and payment references. Our system 
                          prevents duplicate voting, vote manipulation, and ensures complete transparency. 
                          Vote analytics are available to event organizers for audit purposes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Terms & Conditions */}
            <div id="terms" className="scroll-mt-24">
              <GlassCard className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                    <p className="text-gray-600">Rules and policies for platform usage</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-indigo-500" />
                      Fair Use Policy
                    </h3>
                    <ul className="ml-7 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>All participants must provide accurate and truthful information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>Vote manipulation, fraud, or gaming the system is strictly prohibited</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>Automated voting bots or scripts will result in disqualification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>Harassment, hate speech, or inappropriate content will not be tolerated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        <span>Platform administrators reserve the right to remove violating content</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-blue-500" />
                      Privacy & Data Protection
                    </h3>
                    <ul className="ml-7 space-y-2 text-sm">
                      <li>• Personal information is collected and stored securely</li>
                      <li>• Data is used only for platform operations and event management</li>
                      <li>• We do not sell or share your data with third parties</li>
                      <li>• Payment information is handled by Paystack and never stored on our servers</li>
                      <li>• You can request data deletion by contacting support</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-green-500" />
                      Refund Policy
                    </h3>
                    <div className="ml-7 space-y-2">
                      <p className="text-sm">
                        <strong>No refunds</strong> are provided for vote purchases once the transaction 
                        is completed and vote codes are issued. However, refunds may be considered in 
                        exceptional circumstances:
                      </p>
                      <ul className="space-y-1 text-sm list-disc list-inside">
                        <li>Payment was processed but vote code was not issued</li>
                        <li>Event was cancelled before voting period started</li>
                        <li>Technical error prevented vote casting despite valid code</li>
                      </ul>
                      <p className="text-sm mt-2">
                        Refund requests must be submitted within 7 days with supporting documentation.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Liability & Disclaimer
                    </h3>
                    <div className="ml-7 text-sm space-y-2">
                      <p>
                        The platform is provided &quot;as is&quot; without warranties of any kind. 
                        While we strive to ensure system reliability:
                      </p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>We are not responsible for technical issues beyond our control</li>
                        <li>Event organizers are responsible for their event&apos;s rules and policies</li>
                        <li>Vote counts and results are final upon official announcement</li>
                        <li>Disputes should be raised within 48 hours of results publication</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">Important Notice</h4>
                        <p className="text-sm text-red-800">
                          Violation of these terms may result in account suspension, vote 
                          disqualification, or permanent ban from the platform. We employ automated 
                          systems and manual review to detect and prevent fraud. Report suspicious 
                          activity to{' '}
                          <Link href="/contact" className="underline font-medium">our support team</Link>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Call to Action */}
            <GlassCard className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Participate?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join thousands of youth empowering the next generation of tech innovators. 
                Nominate deserving candidates or cast your votes today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/nominate">
                  <Button size="lg" className="bg-gradient-to-r from-[#0152be] to-blue-600 hover:from-blue-700 hover:to-blue-800">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Nominate a Candidate
                  </Button>
                </Link>
                <Link href="/events">
                  <Button size="lg" variant="outline">
                    <Vote className="w-5 h-5 mr-2" />
                    View Active Events
                  </Button>
                </Link>
              </div>
            </GlassCard>

            {/* Contact Support */}
            <div className="text-center text-gray-600">
              <p>
                Have questions? Visit our{' '}
                <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                  Contact page
                </Link>
                {' '}or check out the{' '}
                <Link href="/about" className="text-blue-600 hover:underline font-medium">
                  About section
                </Link>
                {' '}to learn more about IT for Youth Ghana.
              </p>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
