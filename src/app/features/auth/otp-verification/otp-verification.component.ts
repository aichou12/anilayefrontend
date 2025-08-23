import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  otpForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit(): void {
    // Récupérer l'email depuis les paramètres de requête
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  /**
   * Soumet le formulaire de vérification OTP
   */
  onSubmit(): void {
    if (this.otpForm.valid && this.email) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const otpRequest = {
        email: this.email,
        otp: this.otpForm.get('otp')?.value
      };

      this.authService.verifyOtp(otpRequest).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Vérification réussie. Votre compte est maintenant activé.';
          
          // Rediriger vers la page de connexion après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Erreur lors de la vérification du code OTP';
        }
      });
    }
  }

  /**
   * Renvoyer le code OTP
   */
  resendOtp(): void {
    // Implémentez la logique pour renvoyer le code OTP si nécessaire
    alert('Fonctionnalité de renvoi de code OTP à implémenter');
  }
}